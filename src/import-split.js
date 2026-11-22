// 最後更新：2026-11-23 04:55（台北時間）
// 誰幫忙的：Claude Code（Claude Opus 5.5；Claude 桌面 App）
// 修改摘要：新增，把貼上的明細切成一行一筆，解決 AI 回覆換行不見、整段黏成一行的問題

// 貼上的明細常見的毛病：
// - ChatGPT 的回覆在畫面上會把單一換行合併，手動選取複製後整段黏成一行
// - 包在程式碼框（```）裡、前面帶編號或條列符號
// - 指令要求每筆後面加分號；不確定的說明寫在 --- 之後
// 這裡先切成「一行一筆」，每行再交給 parseImportLine 解析品名與金額。

// 一個「金額」token：可帶負號／括號、$／NT$、千分位、小數、元／元整等結尾
const AMOUNT_TOKEN = /^[-(]?(?:NT\$?|\$)?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?\)?(?:元整|元|圓|塊)?$/i;

export function isAmountToken(tk) {
    return AMOUNT_TOKEN.test(tk);
}

export function splitImportText(text) {
    let body = String(text || '')
        .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFF10 + 0x30))
        .replace(/[－−﹣—–]/g, '-')
        .replace(/[（]/g, '(')
        .replace(/[）]/g, ')')
        .replace(/```[A-Za-z]*/g, '\n');               // 程式碼框的 ``` 與語言標籤

    // --- 之後是 AI 的說明，不解析（就算被黏在同一行也一樣）
    const stop = body.search(/(^|\s)-{3,}(?=\s|$)/m);
    if (stop >= 0) body = body.slice(0, stop);

    const lines = body
        .split(/\r?\n|[；;]/)
        .map((l) => l.trim().replace(/^(?:\d{1,3}[.、)]\s*|[•・*-]\s+)/, '').trim())
        .filter(Boolean);

    // 整段黏成一行的救援：在「金額」後面、下一個字不是金額時斷開。
    // 只在明顯是黏在一起時才做，避免把「TWD 600 牛肉麵 180」這種正常的一行拆壞：
    // 一行裡有 3 個以上金額，或整份只有 1 行且有 2 個以上金額。
    const out = [];
    for (const line of lines) {
        const tokens = line.split(/\s+/);
        const amountCount = tokens.filter(isAmountToken).length;
        const collapsed = amountCount >= 3 || (lines.length === 1 && amountCount >= 2);
        if (!collapsed) { out.push(line); continue; }

        let cur = [];
        tokens.forEach((tk, i) => {
            cur.push(tk);
            const next = tokens[i + 1];
            if (isAmountToken(tk) && next !== undefined && !isAmountToken(next) && cur.length >= 2) {
                out.push(cur.join(' '));
                cur = [];
            }
        });
        if (cur.length) out.push(cur.join(' '));
    }
    return out;
}
