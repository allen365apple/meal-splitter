// 最後更新：2026-11-23 08:05（台北時間）
// 誰幫忙的：Claude Code（Claude Opus 5.5；Claude 桌面 App）
// 修改摘要：縮圖改成限制總像素（約 300 萬），細長帳單不再被壓到字糊掉

// 中繼站網址。Gemini 金鑰只放在中繼站的機密設定裡，網頁這邊看不到。
export const AI_ENDPOINT = 'https://meal-splitter-ai.allen365apple.workers.dev/';

export const MAX_PHOTOS = 3;
// 帳單多半細長，只限長邊會把寬度壓到字糊掉；改成限制總像素，長邊另設上限
const MAX_PIXELS = 3_000_000; // 約 2000×1500，三張加起來仍遠低於中繼站的 10MB 上限
const MAX_SIDE = 4000;
const JPEG_QUALITY = 0.85;
const TIMEOUT_MS = 80000; // 中繼站最多會依序試好幾個模型

// 讀照片 → 縮圖 → 轉成 JPEG base64（不含 data: 前綴）
async function loadImage(file) {
    if (typeof createImageBitmap === 'function') {
        try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch (e) { /* 改用 <img> */ }
    }
    return await new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode')); };
        img.src = url;
    });
}

export async function photoToBase64(file) {
    const img = await loadImage(file);
    const w = img.width, h = img.height;
    const scale = Math.min(1, Math.sqrt(MAX_PIXELS / (w * h)), MAX_SIDE / Math.max(w, h));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    if (img.close) img.close();
    const blob = await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode'))), 'image/jpeg', JPEG_QUALITY));
    const dataUrl = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = () => reject(new Error('read'));
        r.readAsDataURL(blob);
    });
    return String(dataUrl).split(',')[1];
}

// 送去中繼站。成功回 { items, fees, notes }；失敗丟出 Error，message 是錯誤代碼
// （quota / not_configured / too_large / network / timeout / upstream / parse / decode …）
export async function readReceipt(files, lang) {
    let images;
    try {
        images = await Promise.all(files.slice(0, MAX_PHOTOS).map(async (f) => ({
            mimeType: 'image/jpeg',
            data: await photoToBase64(f),
        })));
    } catch (e) {
        throw new Error('decode');
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    let res;
    try {
        res = await fetch(AI_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images, lang }),
            signal: ctrl.signal,
        });
    } catch (e) {
        throw new Error(e && e.name === 'AbortError' ? 'timeout' : 'network');
    } finally {
        clearTimeout(timer);
    }

    let data = null;
    try { data = await res.json(); } catch (e) { /* 留給下面判斷 */ }
    if (!res.ok || !data) throw new Error((data && data.error) || 'upstream');
    return {
        items: Array.isArray(data.items) ? data.items : [],
        fees: Array.isArray(data.fees) ? data.fees : [],
        notes: typeof data.notes === 'string' ? data.notes : '',
    };
}
