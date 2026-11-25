// 最後更新：2026-11-26 01:15（台北時間）
// 誰幫忙的：Claude Code（Claude Opus 5.5；Claude 桌面 App）
// 修改摘要：全部模型都塞車時，剩下的時間對輕量模型輪流重試；全部忙線回 busy 讓網頁說清楚是 Google 太多人用

// 這支 Worker 只做一件事：把帳單照片交給 Gemini，回傳 { items, fees, notes }。
// 防濫用：只接受白名單網站、限制照片數量與大小、指令寫死在這裡（不是任何人都能拿來問 Gemini 的通用代理）。
// 金鑰只存在 Cloudflare 的機密設定（env.GEMINI_API_KEY），程式碼與 GitHub 都看不到。

interface Env {
  GEMINI_API_KEY?: string;
  GEMINI_MODELS: string;
  GEMINI_SAFE_MODEL: string;
  ALLOWED_ORIGINS: string;
}

type Line = { name: string; price: number };

const MAX_IMAGES = 3;
const MAX_IMAGE_BASE64 = 4_500_000; // 約 3.3MB 的原圖；網頁端會先縮圖，正常只有幾百 KB
const MAX_BODY = 10_000_000;
// 時間分兩段：清單裡「保底模型」之前的強模型共用 30 秒（每個最多 18 秒），
// 保底模型（3.5 Flash Lite，平常約 6 秒）和之後的模型保證還有 30 秒。最慢約 36 秒會有結果。
const STRONG_EACH_MS = 18_000;
const STRONG_PHASE_MS = 30_000;
const SAFE_EACH_MS = 25_000;
const TOTAL_BUDGET_MS = 65_000; // 網頁端等 80 秒
const MIN_TRY_MS = 5_000;
const RETRY_PAUSE_MS = 2_000; // 第一輪全失敗後，輕量模型每輪重試之間先等一下

const PROMPT_ZH = `你是讀餐廳帳單的助手。請讀這張（或這幾張）帳單照片，回傳 JSON。

規則：
1. items：每一筆消費一個物件 { name, price }。price 是這一筆的金額（數字，不要加符號）。
2. 同一道菜點了多份時，務必拆成多筆、每份一筆，品名加上「第一份」「第二份」…，金額是單價。
   例：帳單「高麗菜 3份 480」→ 高麗菜第一份 160、高麗菜第二份 160、高麗菜第三份 160。
   原因：每一份可能是不同的人吃的，合併成一筆就沒辦法分帳。只有總價時請自己除以份數。
3. 折扣、折抵、優惠用負數放在 items。
4. fees：服務費、清潔費、開瓶費、低消補差額等「不是菜的加收」放這裡，不要放進 items。
5. 不要列出小計、總計、應付、實收、找零、稅額、發票號碼、統一編號、日期、時間、桌號、人數。
6. 看不清楚的品名寫 "?"，不要猜，也不要整筆省略。
7. 品名用繁體中文，照帳單上的寫法，不要自己加說明。
8. notes：如果有看不清楚、不確定、或照片不像帳單的情況，用一兩句繁體中文說明；沒有就給空字串。`;

const PROMPT_EN = `You read restaurant receipts. Read this receipt photo (or photos) and return JSON.

Rules:
1. items: one object { name, price } per purchased line. price is that line's amount as a number, no symbols.
2. If a dish was ordered multiple times, split it into one item per portion, adding "1st", "2nd"… to the name, each at the unit price.
   Example: "Cabbage 3x 480" → Cabbage 1st 160, Cabbage 2nd 160, Cabbage 3rd 160.
   Why: each portion may have been eaten by a different person. If only a total is shown, divide by the quantity.
3. Discounts and vouchers go in items as negative numbers.
4. fees: service charge, cleaning fee, corkage and similar surcharges that are not food go here, not in items.
5. Do not list subtotal, total, amount due, cash received, change, tax, invoice number, tax ID, date, time, table number or party size.
6. If an item name is unreadable, use "?" — do not guess and do not drop the line.
7. Write item names in English (translate if the receipt is in another language), short and plain.
8. notes: one or two English sentences about anything unclear or uncertain, or if the photo is not a receipt; otherwise an empty string.`;

const LINE_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string" },
    price: { type: "number" },
  },
  required: ["name", "price"],
};

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    items: { type: "array", items: LINE_SCHEMA },
    fees: { type: "array", items: LINE_SCHEMA },
    notes: { type: "string" },
  },
  required: ["items", "fees", "notes"],
};

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(origin ? corsHeaders(origin) : {}),
    },
  });
}

// 把 Gemini 回的每一筆整理乾淨；不合格的丟掉
function cleanLines(raw: unknown): Line[] {
  if (!Array.isArray(raw)) return [];
  const out: Line[] = [];
  for (const r of raw) {
    if (!r || typeof r !== "object") continue;
    const name = String((r as any).name ?? "").trim().slice(0, 60);
    const price = Number((r as any).price);
    if (!name || !Number.isFinite(price) || price === 0 || Math.abs(price) > 9_999_999) continue;
    out.push({ name, price: Math.round(price * 100) / 100 });
  }
  return out;
}

// Gemini 回的文字理論上是純 JSON；保險起見也接受被包在 ``` 裡的版本
function parseModelJson(text: string): any {
  const t = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  return JSON.parse(t);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean);
    const origin = request.headers.get("Origin");
    const okOrigin = origin && allowed.includes(origin) ? origin : null;

    if (request.method === "OPTIONS") {
      return okOrigin
        ? new Response(null, { status: 204, headers: corsHeaders(okOrigin) })
        : new Response(null, { status: 403 });
    }
    if (!okOrigin) return json({ error: "origin" }, 403, null);
    if (request.method !== "POST") return json({ error: "method" }, 405, okOrigin);
    if (!env.GEMINI_API_KEY) return json({ error: "not_configured" }, 503, okOrigin);

    const len = Number(request.headers.get("Content-Length") || 0);
    if (len > MAX_BODY) return json({ error: "too_large" }, 413, okOrigin);

    let body: any;
    try {
      body = await request.json();
    } catch {
      return json({ error: "bad_request" }, 400, okOrigin);
    }

    const images = Array.isArray(body?.images) ? body.images : [];
    if (images.length === 0 || images.length > MAX_IMAGES) return json({ error: "bad_request" }, 400, okOrigin);
    for (const img of images) {
      if (typeof img?.data !== "string" || !/^image\/(jpeg|png|webp)$/.test(img?.mimeType || "")) {
        return json({ error: "bad_request" }, 400, okOrigin);
      }
      if (img.data.length > MAX_IMAGE_BASE64) return json({ error: "too_large" }, 413, okOrigin);
    }
    const lang = body?.lang === "en" ? "en" : "zh";

    const prompt = lang === "en" ? PROMPT_EN : PROMPT_ZH;
    const parts = [
      { text: prompt },
      ...images.map((img: any) => ({ inlineData: { mimeType: img.mimeType, data: img.data } })),
    ];
    const models = env.GEMINI_MODELS.split(",").map((s) => s.trim()).filter(Boolean);
    const started = Date.now();
    const tried: string[] = [];
    let sawQuota = false;
    let sawBusy = false;
    const key = env.GEMINI_API_KEY;

    // 試一個模型：成功回 Response；失敗回 null，並記下原因
    const attempt = async (model: string, timeout: number): Promise<Response | null> => {
      // Gemma 不支援指定 JSON 格式，只靠指令要求回 JSON
      const generationConfig = model.startsWith("gemma")
        ? {}
        : { responseMimeType: "application/json", responseJsonSchema: RESPONSE_SCHEMA };
      const url =
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent` +
        `?key=${encodeURIComponent(key)}`;

      let res: Response;
      try {
        res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts }], generationConfig }),
          signal: AbortSignal.timeout(timeout),
        });
      } catch (e) {
        sawBusy = true;
        tried.push(`${model}:timeout`);
        return null;
      }

      if (!res.ok) {
        if (res.status === 429) sawQuota = true;
        if (res.status === 503 || res.status === 500) sawBusy = true;
        tried.push(`${model}:${res.status}`);
        // 只記在 Cloudflare 的紀錄裡，不把 Google 的錯誤訊息原樣丟回網頁
        console.log("gemini error", model, res.status, (await res.text()).slice(0, 300));
        return null;
      }

      try {
        const data: any = await res.json();
        const text = (data?.candidates?.[0]?.content?.parts || [])
          .filter((p: any) => typeof p?.text === "string" && !p.thought)
          .map((p: any) => p.text)
          .join("");
        const parsed = parseModelJson(text);
        if (tried.length) console.log("fallback used", tried.join(" "), "->", model);
        return json(
          {
            items: cleanLines(parsed?.items),
            fees: cleanLines(parsed?.fees),
            notes: typeof parsed?.notes === "string" ? parsed.notes.slice(0, 500) : "",
            model,
          },
          200,
          okOrigin
        );
      } catch (e) {
        tried.push(`${model}:parse`);
        console.log("parse error", model, String(e));
        return null;
      }
    };

    // 第一輪：由強到弱各試一次
    const safeIndex = Math.max(0, models.indexOf(env.GEMINI_SAFE_MODEL));
    for (const [i, model] of models.entries()) {
      const elapsed = Date.now() - started;
      const timeout =
        i < safeIndex
          ? Math.min(STRONG_EACH_MS, STRONG_PHASE_MS - elapsed)
          : Math.min(SAFE_EACH_MS, TOTAL_BUDGET_MS - elapsed);
      if (timeout < MIN_TRY_MS) {
        tried.push(`${model}:skip`);
        continue;
      }
      const ok = await attempt(model, timeout);
      if (ok) return ok;
    }

    // 之後：Google 塞車通常一下就過，剩下的時間對輕量模型（額度多）輪流重試
    const lightModels = models.slice(safeIndex);
    while (sawBusy && lightModels.length) {
      let triedThisRound = false;
      for (const model of lightModels) {
        await new Promise((r) => setTimeout(r, RETRY_PAUSE_MS));
        const timeout = Math.min(SAFE_EACH_MS, TOTAL_BUDGET_MS - (Date.now() - started));
        if (timeout < MIN_TRY_MS) break;
        triedThisRound = true;
        const ok = await attempt(model, timeout);
        if (ok) return ok;
      }
      if (!triedThisRound) break;
    }

    console.log("all models failed", tried.join(" "));
    if (sawBusy) return json({ error: "busy" }, 503, okOrigin);
    return sawQuota
      ? json({ error: "quota" }, 429, okOrigin)
      : json({ error: "upstream" }, 502, okOrigin);
  },
};
