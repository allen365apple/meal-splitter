import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { makeT, makeTf } from './i18n.js';

// --- Icon Components ---
const IconWrapper = ({ children, size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>);
const Plus = (p) => <IconWrapper {...p}><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>;
const Trash2 = (p) => <IconWrapper {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconWrapper>;
const ChevronRight = (p) => <IconWrapper {...p}><path d="m9 18 6-6-6-6"/></IconWrapper>;
const CalculatorIcon = (p) => <IconWrapper {...p}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></IconWrapper>;
const ChevronDown = (p) => <IconWrapper {...p}><path d="m6 9 6 6 6-6"/></IconWrapper>;
const ChevronUp = (p) => <IconWrapper {...p}><path d="m18 15-6-6-6 6"/></IconWrapper>;
const Copy = (p) => <IconWrapper {...p}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></IconWrapper>;
const Check = (p) => <IconWrapper {...p}><path d="M20 6 9 17l-5-5"/></IconWrapper>;
const FileText = (p) => <IconWrapper {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></IconWrapper>;
const Lightbulb = (p) => <IconWrapper {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.5 1.5-4.1C18 4.5 15.5 2 12.5 2 9.5 2 7 4.5 7 7.5c0 1.5.5 2.5 1.5 4.1.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></IconWrapper>;
const X = (p) => <IconWrapper {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>;
const Users = (p) => <IconWrapper {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconWrapper>;
const Settings = (p) => <IconWrapper {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></IconWrapper>;
const Edit = (p) => <IconWrapper {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></IconWrapper>;
const PasteIcon = (p) => <IconWrapper {...p}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></IconWrapper>;
const Sparkles = (p) => <IconWrapper {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></IconWrapper>;
const MenuIcon = (p) => <IconWrapper {...p}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconWrapper>;
const ShareIcon = (p) => <IconWrapper {...p}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></IconWrapper>;
const MoreVertical = (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></IconWrapper>;
const Download = (p) => <IconWrapper {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></IconWrapper>;

const BillSplitter = () => {
    // --- 狀態定義 ---
    const [lang, setLang] = useState(() => {
        try { return localStorage.getItem('bill-splitter-lang') === 'en' ? 'en' : 'zh'; } catch (e) { return 'zh'; }
    });
    const t = makeT(lang);
    const tf = makeTf(lang);
    const isEn = lang === 'en';

    const [tags, setTags] = useState([
        { id: 'regular', name: '一般', emoji: '😋' },
        { id: 'veg', name: '吃素', emoji: '🥦' },
    ]);
    const [users, setUsers] = useState([
        { id: 1, name: '朋友 A', tagId: 'regular' },
        { id: 2, name: '朋友 B (素)', tagId: 'veg' },
    ]);
    const [items, setItems] = useState([]);
    const [serviceChargeRate, setServiceChargeRate] = useState(10); 
    const [extraFee, setExtraFee] = useState(0);   // 固定加收（清潔費、開瓶費等，不乘服務費）
    const setRate = (v) => { const n = parseFloat(v); setServiceChargeRate(!isFinite(n) ? 0 : Math.min(100, Math.max(0, n))); };
    const [step, setStep] = useState(1); 
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [currentSharers, setCurrentSharers] = useState([]);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const [allCopied, setAllCopied] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [calcExpression, setCalcExpression] = useState('');
    
    // Header Compact State
    const [isHeaderCompact, setIsHeaderCompact] = useState(false);
    
    const [showTagManager, setShowTagManager] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagEmoji, setNewTagEmoji] = useState('🍺');
    const [editingUser, setEditingUser] = useState(null);

    const [showImportModal, setShowImportModal] = useState(false);
    const [skippedLines, setSkippedLines] = useState([]);
    const [copyFallbackText, setCopyFallbackText] = useState('');
    const [treats, setTreats] = useState([]);        // [{ beneficiaryId, payerIds: [] }] 請客關係
    const [payerId, setPayerId] = useState(null);    // 這桌誰先付錢
    const [portionItemId, setPortionItemId] = useState(null);     // 正在調整份數的項目
    const [showTreatPanel, setShowTreatPanel] = useState(false);  // 安排請客的總覽面板
    const [treatTargetId, setTreatTargetId] = useState(null);  // 正在設定請客的對象
    const [treatPicks, setTreatPicks] = useState([]);          // 彈窗裡勾選的請客者
    const [inputMode, setInputMode] = useState(null);      // null=尚未選擇, 'manual', 'batch'
    const [isReviewing, setIsReviewing] = useState(false);  // 逐筆卡片檢視中
    const [reviewIndex, setReviewIndex] = useState(0);
    const [pendingReviewIds, setPendingReviewIds] = useState([]);
    const [importText, setImportText] = useState('');
    const APP_URL = 'https://allen365apple.github.io/meal-splitter/';
    const AI_PROMPT_ZH = '請把這張帳單照片轉成純文字明細，嚴格照下面規則輸出：\n\n1. 每一行只寫「品名 金額」，中間一個半形空格。例：高麗菜 160\n2. 金額只寫阿拉伯數字，不要加逗號、$、元等符號。\n3. 同一道菜點了多份時，務必拆成多行分開列，不要合併成一行。\n   例：帳單上是「高麗菜 3份 480」，請輸出：\n   高麗菜第一份 160\n   高麗菜第二份 160\n   高麗菜第三份 160\n   原因：每一份可能是不同的人吃的，合併成一筆就沒辦法分帳。\n   若帳單只有總價沒有單價，請自行除以份數算出單價。\n4. 折扣、折抵請用負數。例：折扣 -50\n5. 服務費、清潔費、開瓶費請放在全部明細的最後面，各自獨立一行。\n   例：服務費 88\n6. 不要列出小計、總計、應付、實收、找零、發票號碼、統一編號、日期、時間、桌號、人數等非消費項目。\n7. 看不清楚的品名就寫 ?，例如：? 120。不要猜，也不要整行省略。\n8. 只輸出明細本身。不要加標題、編號、條列符號、表格、程式碼框或任何說明文字。\n9. 全部用繁體中文。\n\n如果有任何看不清楚或不確定的地方，請在所有明細之後空一行、加一行 --- ，再寫你的說明。\n\n輸出範例：\n宮保雞丁 180\n高麗菜第一份 160\n高麗菜第二份 160\n台灣啤酒 120\n折扣 -50\n服務費 88';
    const AI_PROMPT_EN = 'Please convert this receipt photo into a plain-text itemised list, following these rules exactly:\n\n1. One line per item: "item name<space>amount". Example: Cabbage 160\n2. Amounts: digits only. No commas, no currency symbols.\n3. If the same dish was ordered multiple times, split it into separate lines. Do NOT combine them.\n   Example: the receipt shows "Cabbage 3x 480", output:\n   Cabbage 1st 160\n   Cabbage 2nd 160\n   Cabbage 3rd 160\n   Why: each portion may have been eaten by a different person, so a combined line cannot be split fairly.\n   If the receipt only shows a total, divide it by the quantity to get the unit price.\n4. Discounts and vouchers as negative numbers. Example: Discount -50\n5. Service charge, cleaning fee and corkage go at the very end, each on its own line.\n   Example: Service charge 88\n6. Do NOT list subtotal, total, amount due, cash received, change, invoice number, tax ID, date, time, table number or party size.\n7. If an item name is unreadable, write ?. Example: ? 120. Do not guess, and do not skip the line.\n8. Output the list only. No heading, no numbering, no bullet points, no table, no code block, no commentary.\n\nIf anything was unclear, leave a blank line after the list, then a line with --- , then your notes.\n\nExample output:\nKung Pao Chicken 180\nCabbage 1st 160\nCabbage 2nd 160\nTaiwan Beer 120\nDiscount -50\nService charge 88';
    const [aiPrompt, setAiPrompt] = useState(() => {
        try { return localStorage.getItem('bill-splitter-lang') === 'en' ? AI_PROMPT_EN : AI_PROMPT_ZH; }
        catch (e) { return AI_PROMPT_ZH; }
    });
    const [copyPromptSuccess, setCopyPromptSuccess] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    
    // Install Guide Modal
    const [showInstallGuide, setShowInstallGuide] = useState(false);
    
    // Ref for textarea focus (removed usage as per request, but keeping ref)
    const textareaRef = useRef(null);

    useEffect(() => {
        if (step === 3 && currentSharers.length === 0) {
            setCurrentSharers(users.map(u => u.id));
        }
    }, [step, users]);

    const DEFAULT_TAGS = { zh: ['一般', '吃素'], en: ['Regular', 'Vegetarian'] };
    const DEFAULT_USERS = { zh: ['朋友 A', '朋友 B (素)'], en: ['Friend A', 'Friend B (veg)'] };

    const switchLang = () => {
        const next = isEn ? 'zh' : 'en';
        const from = isEn ? 'en' : 'zh';
        // 預設名稱沒被改過就一起換，改過的就保留（那是使用者的資料）
        setTags(prev => prev.map(tg => {
            const i = DEFAULT_TAGS[from].indexOf(tg.name);
            return i >= 0 ? { ...tg, name: DEFAULT_TAGS[next][i] } : tg;
        }));
        setUsers(prev => prev.map(u => {
            const i = DEFAULT_USERS[from].indexOf(u.name);
            return i >= 0 ? { ...u, name: DEFAULT_USERS[next][i] } : u;
        }));
        setAiPrompt(next === 'en' ? AI_PROMPT_EN : AI_PROMPT_ZH);
        try { localStorage.setItem('bill-splitter-lang', next); } catch (e) { /* 忽略 */ }
        setLang(next);
    };

    // --- 自動存檔 ---
    // 這支 App 的主打功能是「拍帳單 → 切去 ChatGPT 轉文字 → 貼回來」，
    // 手機切 App 回來若被系統清掉背景，沒有存檔就會整頁變白紙。
    const STORAGE_KEY = 'bill-splitter-v1';
    const restoredRef = useRef(false);
    const [savedAt, setSavedAt] = useState(null);
    const [undoInfo, setUndoInfo] = useState(null);   // { label, snapshot }

    // 開啟時還原（只跑一次）
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const d = JSON.parse(raw);
                // 逐項檢查型別，壞掉的欄位就用預設值，不要整包炸掉
                if (Array.isArray(d.tags) && d.tags.length > 0) setTags(d.tags);
                if (Array.isArray(d.users) && d.users.length > 0) setUsers(d.users);
                if (Array.isArray(d.items)) setItems(d.items.map(i => ({ ...i, sharedBy: Array.isArray(i.sharedBy) ? i.sharedBy : [] })));
                if (typeof d.serviceChargeRate === 'number') setServiceChargeRate(d.serviceChargeRate);
                if (typeof d.extraFee === 'number') setExtraFee(d.extraFee);
                if (Array.isArray(d.treats)) setTreats(d.treats.filter(t => t && Array.isArray(t.payerIds)));
                if (d.payerId === null || typeof d.payerId === 'number') setPayerId(d.payerId);
                if (d.inputMode === null || d.inputMode === 'manual' || d.inputMode === 'batch') setInputMode(d.inputMode);
                // 舊存檔（v1，沒有 schema 欄位）的步驟編號要往後移一位：
                // 原本 2=輸入菜色、3=結算，現在中間多了「選輸入方式」
                const st = (d.schema === 2) ? d.step : (d.step >= 2 ? d.step + 1 : d.step);
                if (st >= 1 && st <= 4) setStep(st);
                if (typeof d.savedAt === 'number') setSavedAt(d.savedAt);
            }
        } catch (err) {
            console.warn('讀取存檔失敗，從空白開始', err);
        }
        restoredRef.current = true;
    }, []);

    // 有變動就存（還原完成後才開始存，避免把預設值蓋掉存檔）
    useEffect(() => {
        if (!restoredRef.current) return;
        try {
            const now = Date.now();
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                schema: 2, tags, users, items, serviceChargeRate, extraFee, treats, payerId, inputMode, step, savedAt: now
            }));
            setSavedAt(now);
        } catch (err) {
            console.warn('自動存檔失敗（可能是無痕模式或空間不足）', err);
        }
    }, [tags, users, items, serviceChargeRate, extraFee, treats, payerId, inputMode, step]);

    // --- 刪除復原 ---
    // 刪成員／標籤／菜色會連動改到好幾份狀態，所以整包快照最單純也最不會出錯
    const snapshotNow = () => ({ tags, users, items, treats, currentSharers, payerId });
    const pushUndo = (label) => setUndoInfo({ label, snapshot: snapshotNow() });
    const applyUndo = () => {
        if (!undoInfo) return;
        const s = undoInfo.snapshot;
        setTags(s.tags); setUsers(s.users); setItems(s.items);
        setTreats(s.treats); setCurrentSharers(s.currentSharers); setPayerId(s.payerId);
        setUndoInfo(null);
    };
    // 6 秒後自動收起
    useEffect(() => {
        if (!undoInfo) return;
        const id = setTimeout(() => setUndoInfo(null), 6000);
        return () => clearTimeout(id);
    }, [undoInfo]);

    // 開新的一桌
    const resetAll = () => {
        if (!confirm(t('要清空目前這桌，重新開始嗎？\n\n所有成員、菜色與請客設定都會清除，這個動作無法復原。'))) return;
        try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* 忽略 */ }
        setTags([{ id: 'regular', name: '一般', emoji: '😋' }, { id: 'veg', name: '吃素', emoji: '🥦' }]);
        setUsers([{ id: 1, name: '朋友 A', tagId: 'regular' }, { id: 2, name: '朋友 B (素)', tagId: 'veg' }]);
        setItems([]);
        setServiceChargeRate(10);
        setExtraFee(0);
        setTreats([]);
        setPayerId(null);
        setInputMode(null);
        setCurrentSharers([]);
        setIsReviewing(false);
        setShowTreatPanel(false);
        setTreatTargetId(null);
        setPendingReviewIds([]);
        setSkippedLines([]);
        setExpandedUserId(null);
        setStep(1);
        window.scrollTo(0, 0);
    };

    // P1-4 / P2-3：標記為「大家都有」或「某個標籤」的項目，
    // 要跟著成員／標籤的變動自動更新，否則會出現「按鈕顯示大家都有、實際漏人」的情形。
    // 標籤被刪掉的項目則降級為「自訂名單」，不留下已刪標籤的殘影。
    useEffect(() => {
        setItems(prev => {
            let changed = false;
            const next = prev.map(item => {
                const same = (a, b) => a.length === b.length && a.every(x => b.includes(x));
                if (item.type === 'all') {
                    const ids = users.map(u => u.id);
                    if (same(ids, item.sharedBy)) return item;
                    changed = true;
                    return { ...item, sharedBy: ids, typeLabel: '大家都有' };
                }
                if (item.type === 'custom') return item;
                const tag = tags.find(t => t.id === item.type);
                if (!tag) {
                    changed = true;
                    return { ...item, type: 'custom', typeLabel: '自訂名單' };
                }
                const ids = users.filter(u => u.tagId === tag.id).map(u => u.id);
                if (ids.length === 0) return item;   // 標籤空了就不動，避免變成 0 人分攤
                if (same(ids, item.sharedBy) && item.typeLabel === `${tag.emoji} ${tag.name}`) return item;
                changed = true;
                return { ...item, sharedBy: ids, typeLabel: `${tag.emoji} ${tag.name}` };
            });
            return changed ? next : prev;
        });
    }, [users, tags]);

    // 監聽捲動以切換 Header 模式
    // 用雙門檻（hysteresis）避免震動：
    // 縮小會讓版面變短，瀏覽器把 scrollY 往回夾，若用同一個門檻判斷就會不停來回切換。
    // 這裡「往下超過 COLLAPSE_AT 才縮」、「只有回到最頂端 EXPAND_AT 才展開」，
    // 縮小造成的 scrollY 位移碰不到展開條件，迴圈就斷了。
    const EXPAND_AT = 8;
    // 收起門檻依「實際還能捲多遠」調整。菜色少的時候可捲動距離很短，
    // 用固定 140 會導致永遠收不起來（使用者回報：只剩兩三道菜時滑不動也收不起來）。
    const getCollapseAt = () => {
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        return Math.max(56, Math.min(140, Math.round(maxScroll * 0.28)));
    };
    const SETTLE_MS = 350;   // 切換後的冷卻時間，等版面高度變化與捲動夾動結束再重新判斷
    const compactRef = useRef(false);
    const lastFlipRef = useRef(0);
    // 使用者手動切換過就先鎖住，否則會馬上被捲動邏輯彈回去：
    // 'expanded'  → 手動展開（點輸入欄或展開鈕），滑動時不要自動收起
    // 'collapsed' → 手動收起，還在頂端時不要自動展開
    const overrideRef = useRef(null);
    useEffect(() => {
        let raf = 0;
        let recheck = 0;
        const evaluate = () => {
            raf = 0;
            const y = window.scrollY || document.documentElement.scrollTop || 0;
            const canCompact = items.length > 0;
            const cooling = Date.now() - lastFlipRef.current < SETTLE_MS;
            let next = compactRef.current;
            if (!canCompact) next = false;
            else if (cooling) {
                // 冷卻中先不判斷，但要排一次補判斷，否則版面變動後可能卡在錯誤狀態
                // （例如刪到只剩兩道菜、捲動被夾回頂端，卻還停在收起）
                if (!recheck) recheck = setTimeout(() => { recheck = 0; evaluate(); }, SETTLE_MS + 30);
                return;
            }
            else if (!compactRef.current && y > getCollapseAt() && overrideRef.current !== 'expanded') next = true;
            else if (compactRef.current && y < EXPAND_AT && overrideRef.current !== 'collapsed') next = false;
            // 解鎖時機：回到頂端解除「手動展開」；往下滑過門檻解除「手動收起」
            if (y < EXPAND_AT && overrideRef.current === 'expanded') overrideRef.current = null;
            if (y > getCollapseAt() && overrideRef.current === 'collapsed') overrideRef.current = null;
            if (next !== compactRef.current) {
                compactRef.current = next;
                lastFlipRef.current = Date.now();
                setIsHeaderCompact(next);
            }
        };
        const handleScroll = () => { if (!raf) raf = requestAnimationFrame(evaluate); };
        window.addEventListener('scroll', handleScroll, { passive: true });
        evaluate();
        return () => { window.removeEventListener('scroll', handleScroll); if (raf) cancelAnimationFrame(raf); if (recheck) clearTimeout(recheck); };
    }, [items.length]);

    // 手動展開／收合時，ref 要跟著同步，否則捲動判斷會用到舊值
    const setCompact = (v) => { compactRef.current = v; lastFlipRef.current = Date.now(); setIsHeaderCompact(v); };
    // 點輸入欄就展開（並鎖住不自動收起）
    const expandForInput = () => { if (compactRef.current) { overrideRef.current = 'expanded'; setCompact(false); } };
    // 使用者手動切換上方輸入窗格
    const toggleCompact = () => { const next = !compactRef.current; overrideRef.current = next ? 'collapsed' : 'expanded'; setCompact(next); };

    // --- 邏輯函數 ---
    const addTag = () => { if (!newTagName) return; const newTag = { id: Date.now().toString(), name: newTagName, emoji: newTagEmoji }; setTags([...tags, newTag]); setNewTagName(''); };
    const removeTag = (tagId) => {
        if (tags.length <= 1) return;
        const tag = tags.find(t => t.id === tagId);
        const affected = users.filter(u => u.tagId === tagId).length;
        if (affected > 0 && !confirm(tf('「{0}」目前有 {1} 位成員。\n\n刪除後他們會被改成「{2}」，相關菜色會變成「自訂名單」。\n\n確定要刪除嗎？', tag ? tag.emoji + ' ' + tag.name : t('這個標籤'), affected, tags.find(t2 => t2.id !== tagId).name))) return;
        pushUndo(tf('已刪除標籤「{0}」', tag ? tag.name : ''));
        const fallback = tags.find(t => t.id !== tagId).id;
        setTags(tags.filter(t => t.id !== tagId));
        setUsers(users.map(u => u.tagId === tagId ? { ...u, tagId: fallback } : u));
    };
    const addUser = () => {
        const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        setUsers([...users, { id: nextId, name: tf('朋友 {0}', nextId), tagId: tags[0].id }]);
        // 只有在「已經初始化過」時才追加；若還是空的就留空，
        // 讓進入第 2 步時的「預設全選」邏輯正常生效。
        setCurrentSharers(prev => (prev.length === 0 || prev.includes(nextId)) ? prev : [...prev, nextId]);
    };
    const removeUser = (id) => {
        if (users.length <= 1) return;
        // 刪人之後會變成 0 人分攤的菜，先問過
        const orphaned = items.filter(item => item.sharedBy.length === 1 && item.sharedBy.includes(id));
        if (orphaned.length > 0) {
            const names = orphaned.map(i => `・${i.name} ($${i.price})`).join('\n');
            const ok = confirm(tf('刪掉這個人之後，下面這些菜會變成沒有人分攤：\n\n{0}\n\n這些金額會被標成「未分配」，不會算進任何人的帳單。\n\n確定要刪除嗎？', names));
            if (!ok) return;
        }
        pushUndo(tf('已刪除成員「{0}」', userName(id)));
        setUsers(users.filter(u => u.id !== id));
        setItems(items.map(item => ({ ...item, sharedBy: item.sharedBy.filter(uid => uid !== id) })));
        setCurrentSharers(prev => prev.filter(uid => uid !== id));
    };
    const updateUserTag = (userId, tagId) => { setUsers(users.map(u => u.id === userId ? { ...u, tagId } : u)); setEditingUser(null); };
    const updateName = (id, name) => { setUsers(users.map(u => u.id === id ? { ...u, name } : u)); };
    const toggleSharer = (userId) => { setCurrentSharers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]); };
    const selectGroup = (targetTagId) => {
        if (targetTagId === 'all') { setCurrentSharers(users.map(u => u.id)); return; }
        const groupUserIds = users.filter(u => u.tagId === targetTagId).map(u => u.id);
        if (groupUserIds.length === 0) {
            const tag = tags.find(t => t.id === targetTagId);
            alert(tf('「{0}」目前沒有成員喔！\n\n請先回上一步，把成員的標籤改成這一個。', tag ? tag.emoji + ' ' + tag.name : t('這個標籤')));
            return;
        }
        setCurrentSharers(groupUserIds);
    };
    
    const addItem = () => { if (!newItemName.trim() || currentSharers.length === 0) return;
        const parsedPrice = parseFloat(newItemPrice);
        if (!isFinite(parsedPrice) || parsedPrice === 0) { alert(t('請輸入有效金額。\n\n不能是 0 或空白。\n如果要輸入折扣，請打負數，例如 -50。')); return; }
        if (Math.abs(parsedPrice) > 9999999) { alert(t('金額好像太大了，請確認一下。')); return; }
        let type = 'custom'; let typeLabel = '自訂名單'; const allIds = users.map(u => u.id); if (users.length === currentSharers.length && users.every(u => currentSharers.includes(u.id))) { type = 'all'; typeLabel = '大家都有'; } else { for (const tag of tags) { const tagUserIds = users.filter(u => u.tagId === tag.id).map(u => u.id); if (tagUserIds.length > 0 && tagUserIds.length === currentSharers.length && tagUserIds.every(id => currentSharers.includes(id))) { type = tag.id; typeLabel = `${tag.emoji} ${tag.name}`; break; } } } const newItem = { id: Date.now(), name: newItemName.trim(), price: parsedPrice, type, typeLabel, sharedBy: [...currentSharers] }; setItems([...items, newItem]); setNewItemName(''); setNewItemPrice(''); overrideRef.current = null; };
    // --- 請客 ---
    const userName = (id) => { const u = users.find(x => x.id === id); return u ? u.name : '？'; };
    const openTreatPicker = (beneficiaryId) => {
        const existing = treats.find(t => t.beneficiaryId === beneficiaryId);
        setTreatPicks(existing ? [...existing.payerIds] : []);
        setTreatTargetId(beneficiaryId);
    };
    const toggleTreatPick = (id) => setTreatPicks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const confirmTreat = () => {
        if (treatPicks.length === 0) return;
        setTreats(prev => [
            ...prev.filter(t => t.beneficiaryId !== treatTargetId),
            { beneficiaryId: treatTargetId, payerIds: [...treatPicks] }
        ]);
        setTreatTargetId(null);
        setTreatPicks([]);
    };
    const cancelTreat = (beneficiaryId) => setTreats(prev => prev.filter(t => t.beneficiaryId !== beneficiaryId));

    // 成員被刪掉時，相關的請客關係與付款人要一起清乾淨
    useEffect(() => {
        const alive = new Set(users.map(u => u.id));
        setTreats(prev => {
            const next = prev
                .filter(t => alive.has(t.beneficiaryId))
                .map(t => ({ ...t, payerIds: t.payerIds.filter(id => alive.has(id)) }))
                .filter(t => t.payerIds.length > 0);
            return next.length === prev.length && next.every((t, i) => t.payerIds.length === prev[i].payerIds.length) ? prev : next;
        });
        setPayerId(prev => (prev && !alive.has(prev)) ? null : prev);
    }, [users]);

    const removeItem = (id) => {
        const target = items.find(i => i.id === id);
        pushUndo(tf('已刪除「{0}」', target ? target.name : t('項目')));
        setItems(items.filter(i => i.id !== id));
    };

    // 調整份數（一個人吃兩份就不用把菜輸入兩次）
    const setItemUnits = (itemId, userId, n) => {
        const v = Math.max(1, Math.min(20, Math.floor(n)));
        setItems(items.map(i => {
            if (i.id !== itemId) return i;
            const units = { ...(i.units || {}) };
            if (v === 1) delete units[userId]; else units[userId] = v;
            return { ...i, units };
        }));
    };

    // 卡片檢視時可直接改品名與金額（匯入解析難免有誤，這是第二道防線）
    const updateItemName = (id, name) => setItems(items.map(i => i.id === id ? { ...i, name } : i));
    const updateItemPrice = (id, raw) => {
        const n = parseFloat(raw);
        setItems(items.map(i => i.id === id ? { ...i, price: (isFinite(n) ? n : 0), priceRaw: raw } : i));
    };

    // 逐筆檢視：只看還存在的項目，避免檢視中被刪掉而跳錯
    const liveReviewIds = pendingReviewIds.filter(id => items.some(i => i.id === id));

    const startReview = (ids) => {
        const list = (ids && ids.length) ? ids : items.map(i => i.id);
        if (list.length === 0) return;
        setPendingReviewIds(list);
        setReviewIndex(0);
        setIsReviewing(true);
        window.scrollTo(0, 0);
    };
    const reviewNext = () => {
        if (reviewIndex + 1 >= liveReviewIds.length) { setIsReviewing(false); setSkippedLines([]); }
        else setReviewIndex(reviewIndex + 1);
    };
    const reviewPrev = () => setReviewIndex(Math.max(0, reviewIndex - 1));
    const reviewSkipAll = () => { setIsReviewing(false); setSkippedLines([]); };
    
    // --- 更新 Item 邏輯 ---
    const updateItemSharers = (itemId, targetTagId) => {
        setItems(prevItems => prevItems.map(item => {
            if (item.id !== itemId) return item;
            
            let newSharedBy = [];
            let newTypeLabel = '';
            let newType = targetTagId;

            if (targetTagId === 'all') {
                newSharedBy = users.map(u => u.id);
                newTypeLabel = '大家都有';
            } else {
                const tag = tags.find(t => t.id === targetTagId);
                newSharedBy = users.filter(u => u.tagId === targetTagId).map(u => u.id);
                newTypeLabel = tag ? `${tag.emoji} ${tag.name}` : '自訂';
                if (newSharedBy.length === 0) {
                    alert(t('這個標籤目前沒有成員喔！'));
                    return item; 
                }
            }
            return { ...item, sharedBy: newSharedBy, type: newType, typeLabel: newTypeLabel };
        }));
    };

    const toggleItemSharer = (itemId, userId) => { 
        const target = items.find(i => i.id === itemId);
        // 擋下「取消到 0 人分攤」，否則這筆錢會從總額裡消失
        if (target && target.sharedBy.length === 1 && target.sharedBy.includes(userId)) {
            alert(tf('「{0}」至少要有一個人分攤喔！\n\n如果這道菜要取消，請直接按右上角的垃圾桶刪除。', target.name));
            return;
        }
        setItems(items.map(item => { 
            if (item.id !== itemId) return item; 
            const isSharing = item.sharedBy.includes(userId); 
            let newSharedBy = isSharing ? item.sharedBy.filter(id => id !== userId) : [...item.sharedBy, userId]; 
            return { ...item, sharedBy: newSharedBy, type: 'custom' }; 
        })); 
    };

    // --- 匯入邏輯 ---
    // --- 匯入解析（單行）---
    // 排除收據雜訊行。服務費／清潔費等若被當成菜，第 3 步又會整體加服務費 → 收兩次
    const IMPORT_BLACKLIST = [
        '小計','總計','合計','總額','總共','應付','應收','實收','找零','零錢','現金','刷卡','信用卡',
        '服務費','服務料','清潔費','低消','最低消費','開瓶費','加一','稅額','營業稅','未稅','含稅',
        'total','subtotal','tax','service','cash','change',
        '電話','統編','統一編號','地址','發票','日期','時間','桌號','人數','桌次','訂單','單號','會員','點數'
    ];

    // 折扣類的字眼。帳單上常常寫「折扣 100」卻沒有負號，
    // 直接照抄就會變成加價 100，所以這類項目一律當成負數處理。
    const DISCOUNT_WORDS = ['折扣','折抵','折價','折讓','優惠','抵用','扣抵','減免','discount','coupon','voucher'];

    const parseImportLine = (rawLine) => {
        const raw = rawLine.trim();
        if (!raw) return null;

        // 正規化：全形數字、全形符號、各種破折號、定位字元
        let line = raw
            .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFF10 + 0x30))
            .replace(/[　\t]/g, ' ')
            .replace(/：/g, ':')
            .replace(/[＄﹩]/g, '$')
            .replace(/，/g, ',')
            .replace(/[－—–−﹣ー]/g, '-')
            .replace(/[（]/g, '(')
            .replace(/[）]/g, ')')
            .replace(/\s+/g, ' ')
            .trim();

        // 清掉金額後面的單位與贅字（元／圓／塊／整／NT／TWD），只動結尾不動品名
        // （避免「元盅雞湯」被砍成「盅雞湯」）
        line = line.replace(/(\d)\s*(?:元整|元|圓|塊|塊錢|NTD?|TWD)\s*$/i, '$1');

        const lower = line.toLowerCase();
        const SERVICE_WORDS = ['服務費', '服務料', '清潔費', '開瓶費', '加一', '低消', '最低消費'];
        if (SERVICE_WORDS.some(k => line.includes(k))) {
            // 不當成菜色匯入，否則第 3 步又加一次服務費 → 收兩次
            return { skipped: true, raw, reason: t('服務費類，請在結算頁設定') };
        }
        if (IMPORT_BLACKLIST.some(k => lower.includes(k.toLowerCase()))) {
            return { skipped: true, raw, reason: t('收據雜訊') };
        }

        // 抓「該行最後一個」金額：支援千分位 1,200 / 小數 / 負號 / 括號負數
        // NT / NTD / TWD 前面一定要有空白或行首，否則 "discount 25" 的 "nt" 會被
        // 當成貨幣符號吃掉，品名變成 "discou"。$ 和 ¥ 不可能是字母的一部分，不受此限。
        const m = line.match(/(-|\()?\s*(?:(?:^|\s)(?:NT\$?|NTD|TWD)|\$|¥)?\s*(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?\s*\)?\s*$/i);
        if (!m) return { skipped: true, raw, reason: t('找不到金額') };

        const intPart = m[2].replace(/,/g, '');
        let price = parseFloat(m[3] ? intPart + '.' + m[3] : intPart);
        if (!isFinite(price) || price === 0) return { skipped: true, raw, reason: t('金額無效') };
        // 有負號、或品名帶折扣字眼，都視為折抵
        const isDiscount = !!m[1] || DISCOUNT_WORDS.some(k => lower.includes(k.toLowerCase()));
        if (isDiscount) price = -Math.abs(price);
        if (Math.abs(price) > 9999999) return { skipped: true, raw, reason: t('金額異常') };

        // 品名 = 金額之前的內容，清掉尾端殘留的分隔符號
        let name = line.slice(0, m.index).replace(/[\s:\-x×*$¥]+$/i, '').trim();
        if (!name) return { skipped: true, raw, reason: t('沒有品名') };

        return { name, price };
    };

    const handleBatchImport = () => {
        if (!importText.trim()) return;
        const allUserIds = users.map(u => u.id);
        const newItems = [];
        const skipped = [];

        // 指令裡要求 AI 把不確定的說明寫在一行 --- 之後，解析到那裡就停
        const lines = [];
        for (const line of importText.split('\n')) {
            if (/^\s*-{3,}\s*$/.test(line)) break;
            lines.push(line);
        }

        lines.forEach((line, idx) => {
            const r = parseImportLine(line);
            if (!r) return;                                   // 空行，直接忽略
            if (r.skipped) { skipped.push(r); return; }
            newItems.push({
                id: Date.now() + idx + Math.random(),
                name: r.name,
                price: r.price,
                type: 'all',
                typeLabel: '大家都有',
                sharedBy: [...allUserIds]
            });
        });

        if (newItems.length === 0) {
            alert(t('無法辨識內容 😢\n\n請確保每一行包含「菜名」與「金額」，例如：\n宮保雞丁 180'));
            return;
        }

        setItems(prev => [...prev, ...newItems]);
        setImportText('');
        setShowImportModal(false);
        setSkippedLines(skipped);
        setPendingReviewIds(newItems.map(i => i.id));
        setReviewIndex(0);
        setIsReviewing(true);     // 直接進入逐筆卡片檢視
    };

    // --- 修復後的貼上功能 ---
    const handlePasteText = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setImportText(text);
        } catch (err) {
            console.error('Paste failed', err);
            alert(t('無法自動貼上，請手動貼上'));
        }
    };

    const handleCopyPrompt = () => {
        executeCopy(aiPrompt, () => {
            setCopyPromptSuccess(true);
            setTimeout(() => setCopyPromptSuccess(false), 2000);
        });
    };

    // --- 安全的四則運算解析器（取代 new Function）---
    // 明確處理除以 0、不完整運算式、連續運算子與非數字結果
    const safeEval = (expr) => {
        const src = String(expr).replace(/×/g, '*').replace(/÷/g, '/').replace(/\s+/g, '');
        if (src === '' || !/^[0-9+\-*/.()]+$/.test(src)) return null;
        let i = 0;
        const peek = () => src[i];
        const parseNumber = () => {
            const start = i;
            while (i < src.length && /[0-9.]/.test(src[i])) i++;
            if (i === start) return null;
            const n = parseFloat(src.slice(start, i));
            return isFinite(n) ? n : null;
        };
        let parseExpr;
        const parseFactor = () => {
            if (peek() === '+') { i++; return parseFactor(); }
            if (peek() === '-') { i++; const v = parseFactor(); return v === null ? null : -v; }
            if (peek() === '(') { i++; const v = parseExpr(); if (v === null || peek() !== ')') return null; i++; return v; }
            return parseNumber();
        };
        const parseTerm = () => {
            let left = parseFactor();
            if (left === null) return null;
            while (peek() === '*' || peek() === '/') {
                const op = src[i++];
                const right = parseFactor();
                if (right === null) return null;
                if (op === '/') { if (right === 0) return null; left = left / right; } else { left = left * right; }
            }
            return left;
        };
        parseExpr = () => {
            let left = parseTerm();
            if (left === null) return null;
            while (peek() === '+' || peek() === '-') {
                const op = src[i++];
                const right = parseTerm();
                if (right === null) return null;
                left = (op === '+') ? left + right : left - right;
            }
            return left;
        };
        const val = parseExpr();
        if (val === null || i !== src.length || !isFinite(val)) return null;
        return Math.round(val * 100) / 100;
    };

    // --- 計算機邏輯 ---
    const openCalculator = () => { setCalcExpression(newItemPrice ? newItemPrice.toString() : ''); setShowCalculator(true); };
    const handleCalcInput = (val) => setCalcExpression(prev => prev + val);
    const handleCalcClear = () => setCalcExpression('');
    const handleCalcBackspace = () => setCalcExpression(prev => prev.slice(0, -1));
    const handleCalcEqual = () => {
        const r = safeEval(calcExpression);
        if (r === null) { setCalcExpression(t('算式有誤')); setTimeout(() => setCalcExpression(''), 1200); return; }
        setCalcExpression(String(r));
    };
    const confirmCalcResult = () => {
        const r = safeEval(calcExpression);
        if (r === null) { setCalcExpression(t('算式有誤')); setTimeout(() => setCalcExpression(''), 1200); return; }
        setNewItemPrice(String(r));
        setShowCalculator(false);
    };
    
    // --- 統計 ---
    // 最大餘數法：把 total 依 weights 分配成整數陣列，總和保證等於 total
    const allocate = (total, weights) => {
        const n = weights.length;
        if (n === 0) return [];
        const sign = total < 0 ? -1 : 1;
        const absTotal = Math.abs(Math.round(total));
        let w = weights.map(x => (isFinite(x) && x > 0 ? x : 0));
        let sum = w.reduce((a, b) => a + b, 0);
        if (sum <= 0) { w = weights.map(() => 1); sum = n; }
        const raw = w.map(x => absTotal * x / sum);
        const out = raw.map(r => Math.floor(r));
        let remainder = absTotal - out.reduce((a, b) => a + b, 0);
        const order = raw
            .map((r, i) => ({ i, frac: r - Math.floor(r) }))
            .sort((a, b) => (b.frac - a.frac) || (a.i - b.i));
        for (let k = 0; k < remainder; k++) out[order[k % n].i] += 1;
        return out.map(v => v * sign);
    };

    // 某人在某道菜的份數（預設 1 份）
    const itemUnits = (item, userId) => {
        const n = item.units ? item.units[userId] : 1;
        return (isFinite(n) && n >= 1) ? Math.floor(n) : 1;
    };
    const itemTotalUnits = (item) => item.sharedBy.reduce((a, uid) => a + itemUnits(item, uid), 0);
    const hasMultiUnits = (item) => item.sharedBy.some(uid => itemUnits(item, uid) > 1);

    // 把 total（整數元）依 values（精確元）拆成整數陣列，加總必然等於 total。
    // 用最大餘數法，每一項與真實值相差不超過 1 元；負數（折扣）也能正確處理。
    const splitExact = (total, values) => {
        const n = values.length;
        if (n === 0) return [];
        const floors = values.map(v => Math.floor(v));
        const fr = values.map((v, i) => ({ i, f: v - floors[i] }));
        const out = [...floors];
        let diff = Math.round(total) - floors.reduce((a, b) => a + b, 0);
        if (diff > 0) { fr.sort((a, b) => (b.f - a.f) || (a.i - b.i)); for (let k = 0; k < diff; k++) out[fr[k % n].i] += 1; }
        else if (diff < 0) { fr.sort((a, b) => (a.f - b.f) || (a.i - b.i)); for (let k = 0; k < -diff; k++) out[fr[k % n].i] -= 1; }
        return out;
    };

    const calculation = useMemo(() => {
        const result = {};
        const ids = users.map(u => u.id);
        ids.forEach(id => { result[id] = { baseCents: 0, serviceCents: 0, extraCents: 0, base: 0, serviceCharge: 0, extra: 0, total: 0, details: [] }; });

        const toCents = (n) => Math.round((parseFloat(n) || 0) * 100);

        let subTotalCents = 0;
        let unassignedCents = 0;
        const unassignedItems = [];

        items.forEach(item => {
            const itemCents = toCents(item.price);
            const sharers = item.sharedBy.filter(uid => result[uid]);
            if (sharers.length === 0) {
                // 不再讓錢憑空消失：記為未分配，畫面上會警告
                unassignedCents += itemCents;
                unassignedItems.push(item.name);
                return;
            }
            subTotalCents += itemCents;
            // 份數權重：沒設定的人就是 1 份
            const units = sharers.map(uid => itemUnits(item, uid));
            const totalUnits = units.reduce((a, b) => a + b, 0);
            const shares = allocate(itemCents, units);
            sharers.forEach((userId, idx) => {
                result[userId].baseCents += shares[idx];
                result[userId].details.push({
                    name: item.name,
                    originalPrice: item.price,
                    sharersCount: sharers.length,
                    totalUnits,
                    myUnits: units[idx],
                    cents: shares[idx],
                    type: item.type
                });
            });
        });

        // 服務費：先定總額，再依各人餐費比例用最大餘數法分配
        const serviceTotalCents = Math.round(subTotalCents * serviceChargeRate / 100);
        const serviceShares = allocate(serviceTotalCents, ids.map(id => Math.max(0, result[id].baseCents)));
        ids.forEach((id, idx) => { result[id].serviceCents = serviceShares[idx]; });

        // 固定加收（清潔費等）：全員均分，且不乘服務費
        const extraTotalCents = ids.length > 0 ? toCents(extraFee) : 0;
        const extraShares = allocate(extraTotalCents, ids.map(() => 1));
        ids.forEach((id, idx) => { result[id].extraCents = extraShares[idx]; });

        const grandTotalCents = subTotalCents + serviceTotalCents + extraTotalCents;
        const grandTotal = Math.round(grandTotalCents / 100);

        // 每個人的金額就是「自己吃掉的」，請客不改動任何人的數字，只當註記。
        // 這樣每個人的明細都是乾淨的（不會混進代付項目），加總也自然等於總金額。
        ids.forEach(id => {
            const r = result[id];
            r.ownCents = r.baseCents + r.serviceCents + r.extraCents;
        });

        // 整數化：所有人一起分配，加總保證等於總金額
        const personDollars = splitExact(grandTotal, ids.map(id => result[id].ownCents / 100));
        ids.forEach((id, i) => { result[id].total = personDollars[i]; });

        // --- 請客（純註記，不動金額）---
        // 一個人只能被請一次；不能自己請自己。
        const seen = new Set();
        const effTreats = [];
        treats.forEach(t => {
            if (!result[t.beneficiaryId] || seen.has(t.beneficiaryId)) return;
            const payers = t.payerIds.filter(id => result[id] && id !== t.beneficiaryId);
            if (payers.length === 0) return;
            seen.add(t.beneficiaryId);
            effTreats.push({ beneficiaryId: t.beneficiaryId, payerIds: payers });
        });

        // --- 顯示拆解（每一層都用 splitExact，保證加總相符）---
        ids.forEach(id => {
            const r = result[id];
            const t = effTreats.find(x => x.beneficiaryId === id);
            r.isTreated = !!t;
            r.treatedByIds = t ? t.payerIds : [];

            // 金額拆成 餐費／服務費／固定加收
            const sub = splitExact(r.total, [r.baseCents / 100, r.serviceCents / 100, r.extraCents / 100]);
            r.base = sub[0]; r.serviceCharge = sub[1]; r.extra = sub[2];

            // 明細每一行拆到剛好等於餐費小計
            const lineOut = splitExact(r.base, r.details.map(d => d.cents / 100));
            r.details.forEach((d, i) => { d.myShare = lineOut[i]; });
        });

        return {
            userResults: result,
            subTotal: subTotalCents / 100,
            grandTotal,
            extraTotal: extraTotalCents / 100,
            unassigned: unassignedCents / 100,
            unassignedItems,
            hasUnassigned: unassignedCents !== 0,
            treats: effTreats
        };
    }, [users, items, serviceChargeRate, extraFee, treats, payerId]);
    // 先用正式的剪貼簿 API，失敗才退回舊方法；兩者都失敗就開備援視窗讓使用者手動複製。
    // 舊版一律直接顯示「已複製」，即使實際上沒複製到。
    const executeCopy = async (text, successCallback) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                successCallback();
                return;
            }
        } catch (err) { /* 掉到下面的備援 */ }
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.top = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            ta.setSelectionRange(0, ta.value.length);
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            if (ok) { successCallback(); return; }
        } catch (err) { /* 掉到下面的備援 */ }
        setCopyFallbackText(text);
    };
    // 複製用的文字：中英文用不同的骨架，明細行、頓號分隔都跟著語言走。
    const copyToClipboard = (userId, uName, data) => {
        const fmt = (v) => (v < 0 ? `-$${Math.abs(v)}` : `$${v}`);
        const sep = isEn ? ', ' : '、';
        const nameList = (ids) => ids.map(userName).join(sep);
        const line = '----------------';
        let text = (isEn ? `🧾 ${uName}'s share\n` : `🧾 ${uName} 的帳單明細\n`) + line + '\n';
        data.details.forEach(d => {
            const div = (d.totalUnits === d.sharersCount)
                ? (isEn ? `${d.sharersCount}` : `${d.sharersCount}人`)
                : (isEn ? `${d.totalUnits} portions` : `${d.totalUnits}份`);
            const mine = d.myUnits > 1 ? ` ×${d.myUnits}` : '';
            text += `${d.name}: ${fmt(d.originalPrice)} ÷ ${div}${mine} = ${fmt(d.myShare)}\n`;
        });
        text += line + '\n';
        text += isEn ? `Food subtotal: ${fmt(data.base)}\nService (${serviceChargeRate}%): ${fmt(data.serviceCharge)}\n`
                     : `餐費小計: ${fmt(data.base)}\n服務費(${serviceChargeRate}%): ${fmt(data.serviceCharge)}\n`;
        if (data.extra !== 0) text += (isEn ? `Fixed extra: ${fmt(data.extra)}\n` : `固定加收: ${fmt(data.extra)}\n`);
        text += isEn ? `💰 Total due: $${data.total}` : `💰 應付總額: $${data.total}`;
        if (data.isTreated) text += isEn ? `\n🎁 This one's on ${nameList(data.treatedByIds)}!` : `\n🎁 這餐由 ${nameList(data.treatedByIds)} 請客！`;
        else if (payerId && payerId !== userId && data.total > 0)
            text += isEn ? `\n\n👉 Please transfer $${data.total} to ${userName(payerId)}` : `\n\n👉 請轉帳 $${data.total} 給 ${userName(payerId)}`;
        text += isEn ? `\n\n${line}\nMade with Meal Splitter · Designed by 王柏文\n${APP_URL}`
                     : `\n\n${line}\n聚餐友善分帳機 · Designed by 王柏文\n${APP_URL}`;
        executeCopy(text, () => { setCopiedId(userId); setTimeout(() => setCopiedId(null), 2000); });
    };
    const copyAllResults = () => {
        const fmt = (v) => (v < 0 ? `-$${Math.abs(v)}` : `$${v}`);
        const sep = isEn ? ', ' : '、';
        const nameList = (ids) => ids.map(userName).join(sep);
        const rule = '----------------------------';
        const dateStr = new Date().toLocaleDateString(isEn ? 'en-GB' : 'zh-TW');
        let text = isEn
            ? `🍻 Meal Splitter — Summary\n📅 ${dateStr}\n💰 Total: $${calculation.grandTotal} (incl. ${serviceChargeRate}% service`
            : `🍻 聚餐友善分帳機 - 結算單\n📅 日期: ${dateStr}\n💰 總金額: $${calculation.grandTotal} (含 ${serviceChargeRate}% 服務費`;
        if (calculation.extraTotal !== 0) text += isEn ? `, $${calculation.extraTotal} fixed extra` : `、固定加收 $${calculation.extraTotal}`;
        text += ')\n';
        // 誰請誰 + 誰先付：親切語氣，放在總額下方、明細上方
        const notes = [];
        calculation.treats.forEach(tr => {
            notes.push(isEn ? `🎁 ${userName(tr.beneficiaryId)}'s share today is on ${nameList(tr.payerIds)}!`
                            : `🎁 今天${userName(tr.beneficiaryId)} 的錢錢，由 ${nameList(tr.payerIds)} 請客！`);
        });
        if (payerId && calculation.userResults[payerId]) {
            notes.push(isEn ? `💳 ${userName(payerId)} paid the bill — please transfer your share to them!`
                            : `💳 帳單是${userName(payerId)} 先付的，請大家轉帳給他～`);
        }
        if (notes.length) text += '\n' + notes.join('\n') + '\n';
        text += rule + '\n';
        users.forEach(u => {
            const data = calculation.userResults[u.id];
            if (!data) return;
            if (data.total === 0 && data.details.length === 0) return;
            text += `\n👤 ${u.name}: $${data.total}\n`;
            const parts = data.details.map(d => `${d.name}${d.myUnits > 1 ? `×${d.myUnits}` : ''}(${fmt(d.myShare)})`);
            if (data.serviceCharge !== 0) parts.push(isEn ? `Service(${fmt(data.serviceCharge)})` : `服務費(${fmt(data.serviceCharge)})`);
            if (data.extra !== 0) parts.push(isEn ? `Extra(${fmt(data.extra)})` : `固定加收(${fmt(data.extra)})`);
            text += (isEn ? `   └ ${parts.join(' + ')}\n` : `   └ 明細: ${parts.join(' + ')}\n`);
            if (data.isTreated) text += isEn ? `   └ 🎁 Treated by ${nameList(data.treatedByIds)}\n` : `   └ 🎁 ${nameList(data.treatedByIds)} 請客\n`;
        });
        if (calculation.hasUnassigned) text += isEn
            ? `\n⚠️ $${Math.abs(calculation.unassigned)} is not assigned to anyone (${calculation.unassignedItems.join(', ')})\n`
            : `\n⚠️ 還有 $${Math.abs(calculation.unassigned)} 沒有分配給任何人（${calculation.unassignedItems.join('、')}）\n`;
        text += isEn ? `\n${rule}\nMade with Meal Splitter · Designed by 王柏文\n${APP_URL}`
                     : `\n${rule}\n由「聚餐友善分帳機」自動計算 · Designed by 王柏文\n${APP_URL}`;
        executeCopy(text, () => { setAllCopied(true); setTimeout(() => setAllCopied(false), 2000); });
    };

    // --- UI Render ---
    const renderUserTagSelector = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in" onClick={() => setEditingUser(null)}>
            <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-xs overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700">{t('選擇標籤')}</div>
                <div className="p-2 grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {tags.map(tag => (
                        <button key={tag.id} onClick={() => updateUserTag(editingUser, tag.id)} className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:bg-green-50 hover:border-green-300 transition-all text-left">
                            <span className="text-xl">{tag.emoji}</span><span className="font-bold text-slate-600 text-sm truncate">{tag.name}</span>
                        </button>
                    ))}
                </div>
                <div className="p-3 border-t border-slate-100"><button onClick={() => { setEditingUser(null); setShowTagManager(true); }} className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2"><Settings size={16}/> {t('管理 / 新增標籤')}</button></div>
            </div>
        </div>
    );

    const renderTagManager = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm m-4 overflow-hidden flex flex-col max-h-[80vh]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50"><h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Settings size={20}/> {t('管理群組標籤')}</h3><button onClick={() => setShowTagManager(false)} aria-label={t('關閉')} title={t('關閉')} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full border border-slate-200"><X size={20}/></button></div>
                <div className="p-4 overflow-y-auto flex-1">
                    <div className="space-y-3 mb-6">{tags.map(tag => (<div key={tag.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-2xl">{tag.emoji}</div><span className="font-bold text-slate-700">{tag.name}</span></div>{tags.length > 1 && <button onClick={() => removeTag(tag.id)} aria-label={`刪除標籤 ${tag.name}`} title={t('刪除標籤')} className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={18}/></button>}</div>))}</div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><h4 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">{t('新增自訂標籤')}</h4><div className="flex gap-2 mb-3"><div className="relative"><select value={newTagEmoji} onChange={e => setNewTagEmoji(e.target.value)} aria-label={t('選擇標籤圖示')} className="h-full px-2 bg-white border border-slate-300 rounded-lg text-xl appearance-none outline-none focus:border-green-500">{['🍺','🍷','🥩','🥗','👶','🍰','🚗','🎤','🎲','🐶'].map(e => <option key={e} value={e}>{e}</option>)}</select><span className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-slate-400">▼</span></div><input type="text" placeholder={t('群組名稱 (如: 喝酒)')} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={newTagName} onChange={e => setNewTagName(e.target.value)}/></div><button onClick={addTag} disabled={!newTagName} className="w-full py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:bg-slate-300 disabled:shadow-none shadow-md transition-all"><Plus size={18} className="inline mr-1"/> {t('新增標籤')}</button></div>
                </div>
            </div>
        </div>
    );

    // 文字匯入 Modal
    const renderImportModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm m-4 overflow-hidden flex flex-col h-[75vh]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><PasteIcon size={20}/> {t('貼上文字明細')}</h3>
                    <button onClick={() => setShowImportModal(false)} aria-label={t('關閉')} title={t('關閉')} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full border border-slate-200"><X size={20}/></button>
                </div>
                <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
                    
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-sm text-blue-800 space-y-2">
                        <div className="flex gap-2 items-start">
                            <Lightbulb size={16} className="mt-0.5 flex-shrink-0 text-blue-600"/>
                            <div>
                                <p className="font-bold">{t('懶得打字？拍帳單給 AI 就好')}</p>
                                <p className="text-xs mt-1 leading-relaxed">
                                    <strong>{t('① 拍下帳單')}</strong>{t('傳給 ChatGPT 或 Gemini →')}
                                    <strong> {t('② 複製下面的指令')}</strong>{t('一起貼過去 →')}
                                    <strong> {t('③ 把 AI 回覆的明細貼回這裡')}</strong>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleCopyPrompt}
                            className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${copyPromptSuccess ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}
                        >
                            {copyPromptSuccess ? t('✓ 已複製，貼給 AI 就好') : t('📋 複製給 AI 的指令')}
                        </button>
                        <button
                            onClick={() => setShowPrompt(v => !v)}
                            className="w-full text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1"
                        >
                            {showPrompt ? t('收起指令內容') : t('看看指令寫了什麼（可自行修改）')}
                            <ChevronDown size={12} className={showPrompt ? 'rotate-180 transition-transform' : 'transition-transform'} />
                        </button>
                        {showPrompt && (
                            <textarea
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                aria-label={t('給 AI 的指令')}
                                className="w-full bg-white p-2 rounded-lg border border-blue-200 text-[11px] leading-relaxed text-slate-600 outline-none resize-y font-mono"
                                rows="12"
                            ></textarea>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-end mb-1">
                            <label className="text-sm font-bold text-slate-700">{t('在此貼上明細')}</label>
                            <button 
                                onClick={handlePasteText} 
                                className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors"
                            >
                                <PasteIcon size={12}/> {t('貼上')}
                            </button>
                        </div>
                        <textarea 
                            ref={textareaRef}
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                            placeholder={t('範例：&#10;宮保雞丁 180&#10;炒高麗菜 100&#10;台灣啤酒 60')}
                            className="flex-1 w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-400 bg-slate-50 font-mono text-sm resize-none min-h-[120px]"
                        ></textarea>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-100">
                    <button 
                        onClick={handleBatchImport}
                        disabled={!importText.trim()}
                        className="w-full py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 disabled:bg-slate-300 disabled:shadow-none transition-all"
                    >
                        {t('開始匯入')}
                    </button>
                </div>
            </div>
        </div>
    );

    // Install Guide Modal
    const renderInstallGuide = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowInstallGuide(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm m-4 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">{t('📲 安裝到主畫面')}</h3>
                    <button onClick={() => setShowInstallGuide(false)} aria-label={t('關閉')} title={t('關閉')} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full border border-slate-200"><X size={20}/></button>
                </div>
                <div className="p-6 space-y-6">
                    {/* iOS */}
                    <div className="flex gap-4 items-start">
                        <div className="text-3xl">🍎</div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-slate-700">iOS (Safari)</h4>
                            <p className="text-sm text-slate-500">
                                {isEn ? '1. Tap the ' : '1. 點擊下方 '}<span className="inline-block bg-slate-100 p-1 rounded"><ShareIcon size={14} className="inline"/> {t('分享')}</span>{isEn ? ' button' : ' 按鈕'}<br/>
                                {isEn ? '2. Scroll down and choose ' : '2. 往下滑，選擇 '}<span className="font-bold text-slate-700">{t('加入主畫面')}</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="h-px bg-slate-100 w-full"></div>

                    {/* Android */}
                    <div className="flex gap-4 items-start">
                        <div className="text-3xl">🤖</div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-slate-700">Android (Chrome)</h4>
                            <p className="text-sm text-slate-500">
                                {isEn ? '1. Tap the ' : '1. 點擊右上角 '}<span className="inline-block bg-slate-100 p-1 rounded"><MoreVertical size={14} className="inline"/> {t('選單')}</span>{isEn ? ' button' : ' 按鈕'}<br/>
                                {isEn ? '2. Choose ' : '2. 選擇 '}<span className="font-bold text-slate-700">{t('安裝應用程式')}</span> {t('或')} <span className="font-bold text-slate-700">{t('加入主畫面')}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-green-50 text-center">
                    <p className="text-xs text-green-700 font-medium">{t('✨ 這樣就能像 APP 一樣全螢幕使用囉！')}</p>
                </div>
            </div>
        </div>
    );

    const renderCalculatorModal = () => (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 animate-fade-in">
        <div className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl shadow-2xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2"><h3 className="font-bold text-slate-700 flex items-center gap-2"><CalculatorIcon size={20}/> {t('輔助計算機')}</h3><button onClick={() => setShowCalculator(false)} aria-label={t('關閉計算機')} title={t('關閉')} className="p-2 text-slate-400 hover:text-slate-600"><X size={24}/></button></div>
            <div className="bg-slate-100 p-4 rounded-xl text-right text-2xl font-mono font-bold text-slate-800 overflow-x-auto whitespace-nowrap tracking-widest h-16 flex items-center justify-end">{calcExpression || '0'}</div>
            <div className="grid grid-cols-4 gap-2">
                <button onClick={handleCalcClear} className="bg-red-100 text-red-600 font-bold py-3 rounded-lg active:scale-95">C</button>
                {['/','*','⌫'].map(op => <button key={op} onClick={op==='⌫'?handleCalcBackspace:()=>handleCalcInput(op)} className="bg-slate-200 text-slate-600 font-bold py-3 rounded-lg">{op==='/'?'÷':op==='*'?'×':'⌫'}</button>)}
                {[7,8,9,4,5,6,1,2,3,0].map(n => <button key={n} onClick={()=>handleCalcInput(n.toString())} className={`bg-slate-50 border border-slate-200 font-bold py-3 rounded-lg text-xl shadow-sm ${n===0?'col-span-2':''}`}>{n}</button>)}
                <button onClick={()=>handleCalcInput('-')} className="bg-blue-100 text-blue-600 font-bold py-3 rounded-lg text-xl">-</button>
                <button onClick={()=>handleCalcInput('+')} className="bg-blue-100 text-blue-600 font-bold py-3 rounded-lg text-xl">+</button>
                <button onClick={()=>handleCalcInput('.')} className="bg-slate-50 border border-slate-200 font-bold py-3 rounded-lg text-xl shadow-sm">.</button>
                <button onClick={handleCalcEqual} className="row-span-2 bg-blue-500 text-white font-bold rounded-lg text-xl flex items-center justify-center shadow-lg shadow-blue-200" style={{gridColumn: '4', gridRow: '4/6'}}>=</button>
            </div>
            <button onClick={confirmCalcResult} className="mt-2 w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 active:scale-95">{t('確認金額')}</button>
        </div></div>
    );

    // --- 調整份數 ---
    const renderPortionModal = () => {
        const item = items.find(i => i.id === portionItemId);
        if (!item) return null;
        const sharers = item.sharedBy.filter(uid => users.some(u => u.id === uid));
        const total = itemTotalUnits(item);
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4" onClick={() => setPortionItemId(null)}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
                        <div className="min-w-0">
                            <h3 className="font-bold text-lg text-slate-800 truncate">{tf('⚖️ {0} 的份數', item.name)}</h3>
                            <p className="text-xs text-slate-500 mt-1">
                                {tf('{0} ÷ {1} 份 = 每份 ${2}', item.price < 0 ? `-$${Math.abs(item.price)}` : `$${item.price}`, total, Math.round(item.price / Math.max(1, total)))}
                            </p>
                        </div>
                        <button onClick={() => setPortionItemId(null)} aria-label={t('關閉')} title={t('關閉')} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full border border-slate-200 flex-shrink-0"><X size={18}/></button>
                    </div>
                    <div className="p-4 overflow-y-auto flex-1 space-y-2">
                        <p className="text-xs text-slate-400 mb-2">{t('有人吃兩份就把份數加上去，不用把這道菜輸入兩次。')}</p>
                        {sharers.map(uid => {
                            const u = users.find(x => x.id === uid);
                            const tag = tags.find(t => t.id === u.tagId);
                            const n = itemUnits(item, uid);
                            return (
                                <div key={uid} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white">
                                    <span className="text-xl flex-shrink-0">{tag ? tag.emoji : '😐'}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-slate-700 truncate">{u.name}</div>
                                        <div className="text-[11px] text-slate-400">${Math.round(item.price * n / Math.max(1, total))}</div>
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <button onClick={() => setItemUnits(item.id, uid, n - 1)} disabled={n <= 1} aria-label={t('減少份數')}
                                            className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 disabled:opacity-30">-</button>
                                        <span className="w-9 text-center font-mono font-bold text-slate-800">{n}</span>
                                        <button onClick={() => setItemUnits(item.id, uid, n + 1)} aria-label={t('增加份數')}
                                            className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold hover:bg-slate-200">+</button>
                                    </div>
                                </div>
                            );
                        })}
                        {sharers.length === 0 && <p className="text-sm text-slate-400 text-center py-4">{t('這道菜還沒有人分攤。')}</p>}
                    </div>
                    <div className="p-4 border-t border-slate-100">
                        <button onClick={() => setPortionItemId(null)} className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold">{t('完成')}</button>
                    </div>
                </div>
            </div>
        );
    };

    // --- 安排請客：總覽面板 ---
    // 原本要點開每個人的明細才找得到「請他」，太深。這裡一次列出所有人直接安排。
    const renderTreatPanel = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4" onClick={() => setShowTreatPanel(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-100 bg-amber-50 flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">{t('🎁 安排請客')}</h3>
                        <p className="text-xs text-amber-700 mt-1">{t('選一個人，再決定誰要請他')}</p>
                    </div>
                    <button onClick={() => setShowTreatPanel(false)} aria-label={t('關閉')} title={t('關閉')} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full border border-slate-200 flex-shrink-0"><X size={18}/></button>
                </div>
                <div className="p-4 overflow-y-auto flex-1 space-y-2">
                    {users.map(u => {
                        const d = calculation.userResults[u.id];
                        if (!d) return null;
                        const tag = tags.find(t => t.id === u.tagId);
                        return (
                            <div key={u.id} className={`flex items-center gap-3 p-3 rounded-xl border ${d.isTreated ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
                                <span className="text-xl flex-shrink-0">{tag ? tag.emoji : '😐'}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-slate-700 truncate">{u.name}</div>
                                    <div className="text-[11px] text-slate-400">{tf('應付 ${0}', d.total)}</div>
                                    {d.isTreated && <div className="text-[11px] text-amber-700 truncate">🎁 {d.treatedByIds.map(userName).join('、')} 請客</div>}
                                </div>
                                {d.isTreated ? (
                                    <div className="flex gap-1 flex-shrink-0">
                                        <button onClick={() => openTreatPicker(u.id)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-700 hover:bg-amber-200">{t('改')}</button>
                                        <button onClick={() => cancelTreat(u.id)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200">{t('取消')}</button>
                                    </div>
                                ) : (
                                    <button onClick={() => openTreatPicker(u.id)} disabled={users.length < 2}
                                        className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 disabled:opacity-40 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200">
                                        {t('請他')}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    {calculation.treats.length === 0 && (
                        <p className="text-xs text-slate-400 text-center pt-2">{t('還沒有安排任何請客。')}</p>
                    )}
                </div>
                <div className="p-4 border-t border-slate-100">
                    <button onClick={() => setShowTreatPanel(false)} className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold">{t('完成')}</button>
                </div>
            </div>
        </div>
    );

    // --- 請客彈窗 ---
    const renderTreatPicker = () => {
        const target = users.find(u => u.id === treatTargetId);
        if (!target) return null;
        const data = calculation.userResults[treatTargetId];
        const amount = data ? data.total : 0;
        const candidates = users.filter(u => u.id !== treatTargetId);
        const per = treatPicks.length > 0 ? Math.round(amount / treatPicks.length) : 0;
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in p-4" onClick={() => setTreatTargetId(null)}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                    <div className="p-4 border-b border-slate-100 bg-amber-50">
                        <h3 className="font-bold text-lg text-slate-800">{tf('🎁 誰要請 {0}？', target.name)}</h3>
                        <p className="text-xs text-amber-700 mt-1">{tf('{0} 這餐是 ${1}', target.name, amount)}</p>
                    </div>
                    <div className="p-4 overflow-y-auto flex-1 space-y-3">
                        <button onClick={() => setTreatPicks(candidates.map(u => u.id))}
                            className="w-full py-2.5 rounded-xl text-sm font-bold bg-slate-800 text-white hover:bg-slate-900">{t('大家一起請')}</button>
                        <div className="space-y-2">
                            {candidates.map(u => {
                                const on = treatPicks.includes(u.id);
                                const tag = tags.find(t => t.id === u.tagId);
                                return (
                                    <button key={u.id} onClick={() => toggleTreatPick(u.id)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${on ? 'bg-amber-50 border-amber-400' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                        <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${on ? 'bg-amber-500 text-white' : 'bg-slate-100 border border-slate-300'}`}>
                                            {on && <Check size={14} />}
                                        </span>
                                        <span className="text-xl">{tag ? tag.emoji : '😐'}</span>
                                        <span className="font-bold text-slate-700 truncate">{u.name}</span>
                                    </button>
                                );
                            })}
                            {candidates.length === 0 && <p className="text-sm text-slate-400 text-center py-4">{t('沒有其他人可以請客')}</p>}
                        </div>
                        {treatPicks.length > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
                                {tf('{0} 人一起請 → 每人多付 ${1}', treatPicks.length, per)}
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-slate-100 flex gap-2">
                        <button onClick={() => setTreatTargetId(null)} className="px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100">{t('取消')}</button>
                        <button onClick={confirmTreat} disabled={treatPicks.length === 0}
                            className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-600 disabled:bg-slate-300 disabled:shadow-none">{t('確認請客')}</button>
                    </div>
                </div>
            </div>
        );
    };

    // --- 輸入方式選擇（設定完成員、清單還空的時候才出現）---
    const renderModeChooser = () => (
        <div className="space-y-4 sm:max-w-3xl sm:mx-auto animate-fade-in">
            <div className="text-center pt-2 pb-1">
                <h2 className="text-xl font-bold text-slate-800">{t('怎麼輸入菜色？')}</h2>
                <p className="text-sm text-slate-400 mt-1">
                    {items.length > 0
                        ? `已經輸入 ${items.length} 道，切換不會清掉它們`
                        : t('兩種都可以隨時切換，選一個開始就好')}
                </p>
            </div>

            <button onClick={() => { setInputMode('manual'); setStep(3); }}
                className={`w-full text-left bg-white border-2 rounded-2xl p-5 shadow-sm active:scale-[0.99] transition-all ${inputMode === 'manual' ? 'border-green-500 ring-2 ring-green-100' : 'border-slate-200 hover:border-green-400'}`}>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-600"><Plus size={26} /></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">{t('手動輸入')} <ChevronRight size={18} className="text-slate-300" /></h3>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{t('一道一道加，邊加邊選誰有吃。菜色不多、或是想邊點邊記的時候最順。')}</p>
                    </div>
                </div>
            </button>

            <button onClick={() => { setInputMode('batch'); setStep(3); setShowImportModal(true); }}
                className={`w-full text-left bg-white border-2 rounded-2xl p-5 shadow-lg shadow-green-100 active:scale-[0.99] transition-all relative overflow-hidden ${inputMode === 'batch' ? 'border-green-500 ring-2 ring-green-100' : 'border-green-500'}`}>
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">{t('推薦')}</span>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 text-green-600"><PasteIcon size={24} /></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">{t('大量匯入')} <ChevronRight size={18} className="text-green-400" /></h3>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{t('一次貼上整張明細。匯入後會')}<strong className="text-green-700">{t('一道一道跳卡片')}</strong>{t('讓你確認誰有吃，不用自己回頭一個一個點。')}</p>
                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><Lightbulb size={12} /> {t('可以拍帳單請 ChatGPT 轉成文字再貼過來')}</p>
                    </div>
                </div>
            </button>

            <div className="pt-2 flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">{t('上一步：改成員')}</button>
                {items.length > 0 && (
                    <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">{t('回到清單')}</button>
                )}
            </div>
        </div>
    );

    // --- 逐筆卡片檢視（批次匯入後）---
    const renderReviewCard = () => {
        const item = items.find(i => i.id === liveReviewIds[reviewIndex]);
        if (!item) return null;
        const total = liveReviewIds.length;
        const isLast = reviewIndex + 1 >= total;
        return (
            <div className="space-y-4 sm:max-w-xl sm:mx-auto animate-fade-in pb-28">
                {/* 進度 */}
                <div className="pt-1">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-slate-700">{t('這道菜誰有吃？')}</span>
                        <span className="text-xs font-mono text-slate-400">{reviewIndex + 1} / {total}</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${((reviewIndex + 1) / total) * 100}%` }} />
                    </div>
                </div>

                {/* 沒認出來的行，只在第一張顯示 */}
                {reviewIndex === 0 && skippedLines.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800">
                        <strong>{tf('有 {0} 行沒有匯入', skippedLines.length)}</strong>
                        <div className="mt-1 space-y-0.5 text-amber-700">
                            {skippedLines.slice(0, 4).map((x, i) => <div key={i}>・{x.raw}（{x.reason}）</div>)}
                            {skippedLines.length > 4 && <div>{tf('・…等 {0} 行', skippedLines.length - 4)}</div>}
                        </div>
                    </div>
                )}

                {/* 主卡片 */}
                <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 space-y-4 animate-fade-in">
                    <div className="flex gap-2 items-stretch">
                        <input type="text" value={item.name} onChange={e => updateItemName(item.id, e.target.value)}
                            aria-label={t('品名')}
                            className="flex-1 min-w-0 w-full text-lg font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400" />
                        <div className="flex-shrink-0 flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 focus-within:ring-2 focus-within:ring-green-400">
                            <span className="text-slate-400 font-bold">$</span>
                            <input type="number" step="any" inputMode="decimal" value={item.price}
                                onChange={e => updateItemPrice(item.id, e.target.value)} aria-label={t('金額')}
                                className="w-16 bg-transparent text-right font-bold text-slate-800 outline-none py-2" />
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-400 -mt-2">{t('品名或金額認錯了？可以直接在上面改')}</p>

                    {/* 標籤快捷 */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        <button onClick={() => updateItemSharers(item.id, 'all')}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-colors ${item.type === 'all' ? 'bg-green-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{t('全選')}</button>
                        {tags.map(tag => (
                            <button key={tag.id} onClick={() => updateItemSharers(item.id, tag.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 border transition-colors ${item.type === tag.id ? 'bg-green-500 text-white border-green-500 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-green-50'}`}>
                                {tag.emoji} {tag.name}
                            </button>
                        ))}
                    </div>

                    {/* 大格子選人 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {users.map(u => {
                            const on = item.sharedBy.includes(u.id);
                            const tag = tags.find(t => t.id === u.tagId);
                            return (
                                <button key={u.id} onClick={() => toggleItemSharer(item.id, u.id)}
                                    className={`py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${on ? 'bg-green-500 text-white border-green-500 shadow-sm' : 'bg-white text-slate-300 border-slate-200'}`}>
                                    <span className={on ? '' : 'grayscale opacity-40'}>{tag ? tag.emoji : '😐'}</span>
                                    <span className="truncate">{u.name}</span>
                                    {on && <Check size={14} className="flex-shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
                        <span>
                            {tf('目前 {0} 人', item.sharedBy.length)}
                            {hasMultiUnits(item) ? ' / ' + tf('{0} 份', itemTotalUnits(item)) : ''}
                            {tf('，每份 ${0}', Math.round(item.price / Math.max(1, itemTotalUnits(item))))}
                        </span>
                        <button onClick={() => setPortionItemId(item.id)} className="font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded hover:bg-slate-200">{t('⚖️ 份數')}</button>
                    </div>
                </div>

                <button onClick={() => { if (confirm(tf('確定要刪掉「{0}」嗎？', item.name))) { removeItem(item.id); reviewNext(); } }}
                    className="w-full py-2 text-xs font-bold text-slate-400 hover:text-red-500 flex items-center justify-center gap-1">
                    <Trash2 size={14} /> {t('這道不用算，刪掉')}
                </button>

                {/* 底部操作 */}
                <div className="fixed bottom-0 left-0 right-0 w-full max-w-md sm:max-w-2xl mx-auto p-4 sm:px-6 bg-white border-t border-slate-200 z-20 pb-safe">
                    <div className="flex gap-3">
                        <button onClick={reviewPrev} disabled={reviewIndex === 0}
                            className="px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition-colors">{t('上一道')}</button>
                        <button onClick={reviewNext}
                            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 flex items-center justify-center gap-2">
                            {isLast ? <>{t('完成檢視')} <Check size={18} /></> : <>{t('確認，下一道')} <ChevronRight size={18} /></>}
                        </button>
                    </div>
                    <button onClick={reviewSkipAll} className="w-full mt-2 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600">
                        {t('略過檢視，直接看全部清單')}
                    </button>
                </div>
            </div>
        );
    };

    // --- 主畫面 Render ---
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 w-full max-w-md sm:max-w-2xl lg:max-w-6xl mx-auto shadow-2xl sm:shadow-xl relative pb-safe">
            <header className="bg-white p-4 sm:px-6 shadow-sm sticky top-0 z-20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white flex-shrink-0"><Users size={20} /></div>
                    <h1 className="font-bold text-lg tracking-tight text-slate-800 truncate">{t('聚餐友善分帳機')}</h1>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button onClick={switchLang}
                        aria-label={isEn ? '切換成中文' : 'Switch to English'}
                        title={isEn ? '切換成中文' : 'Switch to English'}
                        className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-full hover:bg-slate-200 active:scale-95 transition-all">
                        {isEn ? '中文' : 'EN'}
                    </button>
                    <div className="flex gap-1">{[1, 2, 3, 4].map(i => <div key={i} className={`h-2 w-2 rounded-full transition-colors ${step === i ? 'bg-green-500' : 'bg-slate-200'}`} />)}</div>
                </div>
            </header>

            <main className="p-4 sm:p-6">
                {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-2">
                        <p className="text-sm text-green-800 leading-relaxed">
                            {t('歡迎！請設定成員並標記標籤。')}<br/>{t('可以自訂')} <strong>{t('「🥦 素食」')}</strong>{isEn ? ', ' : '、'}<strong>{t('「🍺 只喝酒」')}</strong>{isEn ? ' ' : ''}{t('等標籤，等等只要一鍵就能只分帳給這個標籤的人！')}
                        </p>
                    </div>
                    <div className="flex justify-end"><button onClick={() => setShowTagManager(true)} className="text-xs font-bold text-slate-500 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors"><Settings size={14}/> {tf('管理標籤 ({0})', tags.length)}</button></div>
                    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">{users.map((user) => { const userTag = tags.find(t => t.id === user.tagId) || tags[0]; return (<div key={user.id} className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm border border-slate-100"><button onClick={() => setEditingUser(user.id)} aria-label={`更改 ${user.name} 的標籤`} title={t('更改標籤')} className="w-12 h-12 flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-200 hover:border-green-400 hover:bg-green-50 transition-all flex-shrink-0 relative group"><span className="text-xl leading-none mb-0.5">{userTag.emoji}</span><span className="text-[10px] font-bold text-slate-500 leading-none">{userTag.name}</span><div className="absolute -bottom-1 -right-1 bg-white rounded-full border border-slate-200 p-0.5 text-slate-400 group-hover:text-green-500"><Edit size={8} /></div></button><input type="text" value={user.name} onChange={(e) => updateName(user.id, e.target.value)} aria-label={t('成員名字')} maxLength={20} className="flex-1 min-w-0 bg-transparent border-b border-transparent focus:border-green-400 outline-none px-2 py-1 font-medium text-slate-700 text-lg" placeholder={t('輸入名字')} /><button onClick={() => removeUser(user.id)} aria-label={`刪除成員 ${user.name}`} title={t('刪除成員')} className="p-2 text-slate-300 hover:text-red-500 flex-shrink-0"><Trash2 size={18} /></button></div>); })}</div>
                    <button onClick={addUser} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"><Plus size={20} /> {t('新增朋友')}</button>
                    <div className="pt-4 sm:max-w-md sm:mx-auto"><button onClick={() => setStep(2)} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center justify-center gap-2">{t('下一步：輸入菜色')} <ChevronRight size={20} /></button></div>
                    <div className="mt-6 flex flex-col items-center gap-3">
                        <button onClick={resetAll} className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors">
                            <Trash2 size={12}/> {t('清空這桌，重新開始')}
                        </button>
                        <a href="https://github.com/allen365apple/meal-splitter" target="_blank" rel="noopener noreferrer"
                            className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-200 hover:text-slate-600 transition-colors">{t('Designed by 王柏文')}</a>
                        {savedAt && <span className="text-[10px] text-slate-300">{tf('已自動儲存 · {0}', new Date(savedAt).toLocaleTimeString(isEn ? 'en-GB' : 'zh-TW'))}</span>}
                    </div>
                </div>
                )}

                {step === 2 && renderModeChooser()}
                {step === 3 && isReviewing && liveReviewIds.length > 0 && renderReviewCard()}
                {step === 3 && !(isReviewing && liveReviewIds.length > 0) && (
                <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-6 lg:items-start animate-fade-in">
                    {/* Sticky Header with Smooth Transition */}
                    {/* 上方輸入窗格。精簡原則：展開時也只留必要的東西，
                        收起時縮到「品項＋金額＋加入」一列半。切換鈕只用一個箭頭符號。 */}
                    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-[72px] z-10 transition-all duration-300 ease-in-out ${isHeaderCompact ? 'p-2 shadow-md rounded-b-xl' : 'p-3 rounded-2xl'}`}>

                        {/* 品項自己一行，金額那一列放計算機與貼上明細。
                            收起時為了壓高度才把兩者併成一列（反正一點輸入欄就會展開）。 */}
                        <div className={isHeaderCompact ? 'flex gap-2 items-stretch mb-2' : 'space-y-2 mb-2'}>
                            <input type="text" placeholder={t('品項（如：椒麻雞）')} aria-label={t('品項名稱')} maxLength={40}
                                className={`min-w-0 w-full bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-green-400 px-3 py-2.5 text-sm transition-all ${isHeaderCompact ? 'flex-1' : ''}`}
                                value={newItemName} onChange={(e) => setNewItemName(e.target.value)} onFocus={expandForInput} />
                            <div className={`flex gap-2 items-stretch ${isHeaderCompact ? 'flex-shrink-0' : ''}`}>
                                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 focus-within:ring-2 focus-within:ring-green-400 flex-1">
                                    <span className="text-slate-400 text-sm">$</span>
                                    <input type="number" step="any" inputMode="decimal" placeholder={t('金額')} aria-label={t('金額')}
                                        className={`bg-transparent text-right outline-none py-2.5 text-sm ${isHeaderCompact ? 'w-16' : 'w-full'}`}
                                        value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} onFocus={expandForInput} />
                                </div>
                                <button onClick={openCalculator} aria-label={t('打開計算機')} title={t('計算機')}
                                    className="flex-shrink-0 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 active:scale-95 transition-colors border border-slate-200 px-2.5">
                                    <CalculatorIcon size={20} />
                                </button>
                                {!isHeaderCompact && (
                                    <button onClick={() => setShowImportModal(true)} aria-label={t('貼上文字明細')} title={t('貼上文字明細，一次匯入整張帳單')}
                                        className="flex-shrink-0 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 active:scale-95 transition-colors border border-slate-200 px-2.5">
                                        <PasteIcon size={20} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 展開時：選人區 */}
                        {!isHeaderCompact && (
                            <>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-slate-400 flex-shrink-0">{t('誰有吃')}</span>
                                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar flex-1">
                                        <button onClick={() => selectGroup('all')} className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 whitespace-nowrap flex-shrink-0">{t('全選')}</button>
                                        {tags.map(tag => (
                                            <button key={tag.id} onClick={() => selectGroup(tag.id)} className="px-2.5 py-1 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-600 hover:bg-green-50 hover:border-green-200 hover:text-green-700 whitespace-nowrap flex-shrink-0">
                                                {tag.emoji}{tag.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 mb-2">
                                    {users.map(u => {
                                        const isSelected = currentSharers.includes(u.id);
                                        const userTag = tags.find(t => t.id === u.tagId);
                                        return (
                                            <button key={u.id} onClick={() => toggleSharer(u.id)}
                                                className={`py-1.5 px-1 rounded-lg text-xs font-bold border transition-all truncate ${isSelected ? 'bg-green-500 text-white border-green-500' : 'bg-white text-slate-400 border-slate-200'}`}>
                                                {userTag ? userTag.emoji : ''}{u.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {/* 加入清單 */}
                        <button onClick={addItem} disabled={!newItemName || !newItemPrice || currentSharers.length === 0}
                            className={`w-full bg-slate-800 text-white rounded-lg font-bold shadow hover:bg-slate-900 disabled:bg-slate-300 disabled:shadow-none transition-all flex items-center justify-center gap-1.5 text-sm ${isHeaderCompact ? 'py-2' : 'py-2.5'}`}>
                            <Plus size={16} /> {t('加入清單')}
                            {!isHeaderCompact && <span className="font-normal text-slate-400">{tf('· {0}人', currentSharers.length)}</span>}
                        </button>

                        {/* 底部收合把手：整排都能按，比角落的小箭頭好按很多。
                            外層 div 用負邊距撐滿到卡片邊緣，按鈕在裡面填滿，
                            不依賴 display 類別的優先順序。 */}
                        <div className={`border-t border-slate-100 ${isHeaderCompact ? '-mx-2 -mb-2 mt-1.5' : '-mx-3 -mb-3 mt-2'}`}>
                            <button onClick={toggleCompact}
                                aria-label={isHeaderCompact ? '展開輸入區' : '收起輸入區'}
                                title={isHeaderCompact ? '展開輸入區，選誰有吃' : '收起輸入區，方便看下面的清單'}
                                className={`w-full flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors rounded-b-2xl ${isHeaderCompact ? 'py-1.5' : 'py-2'}`}>
                                {isHeaderCompact ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* 項目列表區塊 */}
                    <div className="space-y-3 pb-24 pt-2 lg:pt-0 min-h-[78vh] lg:min-h-0">
                        {items.length > 0 && (
                            <div className="flex justify-between items-center px-1">
                                <span className="text-xs font-bold text-slate-400">{tf('共 {0} 道', items.length)}</span>
                                <button onClick={() => startReview(items.map(i => i.id))}
                                    className="text-xs font-bold text-slate-500 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors">
                                    🔍 {t('逐筆檢查')}
                                </button>
                            </div>
                        )}
                        {calculation.hasUnassigned && (
                            <div className="bg-red-50 border-2 border-red-200 p-3 rounded-xl flex gap-2 items-start">
                                <span className="text-lg leading-none">⚠️</span>
                                <div className="text-xs text-red-700 leading-relaxed">
                                    <strong>有 ${Math.abs(calculation.unassigned)} 沒有分配給任何人</strong>
                                    <div className="mt-1 text-red-600">
                                        {calculation.unassignedItems.join('、')} 目前沒有人分攤，這些金額<strong>{t('不會')}</strong>{t('算進任何人的帳單。請幫這些項目選人，或直接刪除。')}
                                    </div>
                                </div>
                            </div>
                        )}
                        {items.length === 0 && <div className="text-center py-10 text-slate-400"><p>{t('還沒有點菜喔！')}</p></div>}
                        <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
                        {items.map((item) => (
                        <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-1 mr-2"><h3 className="font-bold text-slate-700 break-all leading-tight">{item.name}</h3></div>
                                <div className="flex items-center gap-3">{item.sharedBy.length === 0 && <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">{t('未分配')}</span>}<span className={`font-bold ${item.price < 0 ? 'text-green-600' : 'text-slate-800'}`}>{item.price < 0 ? `-$${Math.abs(item.price)}` : `$${item.price}`}</span><button onClick={() => setPortionItemId(item.id)} aria-label={`調整 ${item.name} 的份數`} title={t('調整份數')} className={`text-xs font-bold px-1.5 py-0.5 rounded border transition-colors ${hasMultiUnits(item) ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-slate-300 border-slate-200 hover:text-slate-500 hover:border-slate-300'}`}>⚖️{hasMultiUnits(item) ? ` ${itemTotalUnits(item)}份` : ''}</button><button onClick={() => removeItem(item.id)} aria-label={`刪除 ${item.name}`} title={t('刪除這道菜')} className="text-slate-300 hover:text-red-400"><Trash2 size={16} /></button></div>
                            </div>
                            
                            {/* 簡化後的快速套用列 (按鈕顏色即代表狀態) */}
                            <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-100 border-dashed">
                                <span className="text-[10px] text-slate-300 self-center whitespace-nowrap flex-shrink-0">{t('分配給:')}</span>
                                <button 
                                    onClick={() => updateItemSharers(item.id, 'all')} 
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-colors flex-shrink-0 ${item.type === 'all' ? 'bg-green-500 text-white shadow-sm' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                >
                                    {t('全選')}
                                </button>
                                {tags.map(tag => (
                                    <button 
                                        key={tag.id} 
                                        onClick={() => updateItemSharers(item.id, tag.id)} 
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap border transition-colors flex-shrink-0 ${item.type === tag.id ? 'bg-green-500 text-white border-green-500 shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:bg-green-50 hover:text-green-600 hover:border-green-200'}`}
                                    >
                                        {tag.emoji} {tag.name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-1">
                                {users.map(u => (
                                    <button 
                                        key={u.id} 
                                        onClick={() => toggleItemSharer(item.id, u.id)} 
                                        className={`text-[10px] px-2 py-1 rounded border transition-all ${
                                            item.sharedBy.includes(u.id) 
                                            ? 'bg-slate-700 text-white border-slate-700' 
                                            : 'bg-white text-slate-300 border-slate-100'
                                        }`}
                                    >
                                        {u.name}{item.sharedBy.includes(u.id) && itemUnits(item, u.id) > 1 ? ` ×${itemUnits(item, u.id)}` : ''}
                                    </button>
                                ))}
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 w-full max-w-md sm:max-w-2xl lg:max-w-6xl mx-auto p-4 sm:px-6 bg-white border-t border-slate-200 flex gap-3 z-20 pb-safe">
                        <button onClick={() => setStep(2)} className="px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">{t('上一步')}</button>
                        <button onClick={() => setStep(4)} disabled={items.length === 0} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 disabled:bg-slate-300 disabled:shadow-none">{t('計算分帳')}</button>
                    </div>
                </div>
                )}

                {step === 4 && (
                <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-6 lg:items-start animate-fade-in pb-32">
                    <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg lg:sticky lg:top-[88px]">
                        <div className="flex justify-between items-end mb-4"><span className="text-slate-400">{t('總金額 (含服務費)')}</span><span className="text-4xl font-bold">${Math.round(calculation.grandTotal)}</span></div>

                        <div className="bg-slate-700/50 p-3 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm"><CalculatorIcon size={16} /> {t('服務費率')}</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setRate(serviceChargeRate - 1)} aria-label={t('服務費率減 1%')} className="w-7 h-7 bg-slate-600 rounded flex items-center justify-center active:scale-95">-</button>
                                    <div className="flex items-center bg-slate-800 rounded px-2">
                                        <input type="number" step="any" inputMode="decimal" min="0" max="100" aria-label={t('服務費率')} value={serviceChargeRate}
                                            onChange={e => setRate(e.target.value)}
                                            className="w-12 bg-transparent text-right font-mono outline-none py-1" />
                                        <span className="text-slate-400 text-sm">%</span>
                                    </div>
                                    <button onClick={() => setRate(serviceChargeRate + 1)} aria-label={t('服務費率加 1%')} className="w-7 h-7 bg-slate-600 rounded flex items-center justify-center active:scale-95">+</button>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {[0, 5, 10].map(r => (
                                    <button key={r} onClick={() => setRate(r)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-colors ${Number(serviceChargeRate) === r ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}>
                                        {r === 0 ? t('免服務費') : `${r}%`}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-600 pt-3">
                                <span className="text-sm">
                                    {t('固定加收')}
                                    <span className="block text-[10px] text-slate-400">{t('清潔費等，全員均分、不加服務費')}</span>
                                </span>
                                <div className="flex items-center bg-slate-800 rounded px-2">
                                    <span className="text-slate-400 text-sm">$</span>
                                    <input type="number" step="any" inputMode="decimal" aria-label={t('固定加收金額')} value={extraFee}
                                        onChange={e => { const n = parseFloat(e.target.value); setExtraFee(!isFinite(n) ? 0 : n); }}
                                        className="w-16 bg-transparent text-right font-mono outline-none py-1" />
                                </div>
                            </div>
                        </div>
                        {/* 誰先付 + 轉帳指示：放在總金額正下方，這是算完之後最想看到的資訊 */}
                        <div className="mb-4 bg-slate-700/50 p-3 rounded-lg">
                            <div className="text-sm mb-2 flex items-center gap-2 flex-wrap">{t('💳 這桌誰先付？')}<span className="text-[10px] text-slate-400">{t('會寫進複製的結算單')}</span></div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                <button onClick={() => setPayerId(null)} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 ${payerId === null ? 'bg-white text-slate-800' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}>{t('不指定')}</button>
                                {users.map(u => (
                                    <button key={u.id} onClick={() => setPayerId(u.id)} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 ${payerId === u.id ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}>{u.name}</button>
                                ))}
                            </div>
                        </div>

                        {/* 請客入口：不用再點開每個人的明細才找得到 */}
                        <button onClick={() => setShowTreatPanel(true)}
                            className="w-full mb-4 py-2.5 rounded-lg text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-2">
                            {t('🎁 安排請客')}
                            {calculation.treats.length > 0 && <span className="bg-amber-400 text-amber-900 text-[10px] px-1.5 py-0.5 rounded-full">{calculation.treats.length}</span>}
                        </button>

                        <button onClick={copyAllResults} className={`w-full mt-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${allCopied ? 'bg-green-500 text-white' : 'bg-white text-slate-800 hover:bg-slate-100'}`}>{allCopied ? <><Check size={18}/> {t('已複製全員結算單！')}</> : <><FileText size={18}/> {t('複製全員結算單')}</>}</button>
                        
                        <button 
                            onClick={() => setShowInstallGuide(true)}
                            className="w-full mt-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/10 flex items-center justify-center gap-1 transition-colors"
                        >
                            <Download size={14}/> {t('覺得好用？加到主畫面')}
                        </button>
                    </div>
                    <div className="space-y-4">
                        {calculation.hasUnassigned && (
                            <div className="bg-red-50 border-2 border-red-200 p-3 rounded-xl flex gap-2 items-start">
                                <span className="text-lg leading-none">⚠️</span>
                                <div className="text-xs text-red-700 leading-relaxed">
                                    <strong>有 ${Math.abs(calculation.unassigned)} 沒有分配給任何人</strong>
                                    <div className="mt-1 text-red-600">
                                        {calculation.unassignedItems.join('、')} 目前沒有人分攤，這些金額<strong>{t('不會')}</strong>{t('算進任何人的帳單。請幫這些項目選人，或直接刪除。')}
                                    </div>
                                </div>
                            </div>
                        )}
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">{t('詳細分帳結果')}</h3>
                        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                        {users.map(u => {
                            const data = calculation.userResults[u.id];
                            if (!data) return null;
                            const isExpanded = expandedUserId === u.id;
                            const userTag = tags.find(t => t.id === u.tagId);
                            return (
                            <div key={u.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${data.isTreated ? 'border-amber-200' : 'border-slate-100'}`}>
                                <div className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${data.isTreated ? 'bg-amber-50 hover:bg-amber-100' : 'bg-slate-50 hover:bg-slate-100 active:bg-slate-200'}`} onClick={() => setExpandedUserId(isExpanded ? null : u.id)}>
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="text-2xl flex-shrink-0">{userTag ? userTag.emoji : '😐'}</div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-slate-800 truncate">{u.name}</h3>
                                            {data.isTreated
                                                ? <p className="text-xs text-amber-700 font-medium truncate">🎁 {data.treatedByIds.map(userName).join('、')} 請客</p>
                                                : <p className="text-xs text-slate-400">{isExpanded ? t('點擊收合') : t('點擊查看算式')}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xl font-bold text-green-600">${data.total}</span>
                                        {isExpanded ? <ChevronUp size={20} className="text-slate-400"/> : <ChevronDown size={20} className="text-slate-400"/>}
                                    </div>
                                </div>
                                {isExpanded && (
                                <div className="bg-white border-t border-slate-100">
                                    <div className="p-4 space-y-3">
                                        <div className="bg-slate-50 rounded-lg p-3 space-y-2 text-sm text-slate-600">
                                            {data.details.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-200 last:border-0 border-dashed">
                                                    <div className="flex-1 min-w-0">
                                                        <span className="font-medium text-slate-700">{item.name}</span>
                                                        <div className="text-xs text-slate-400 font-mono">{item.originalPrice < 0 ? `-$${Math.abs(item.originalPrice)}` : `$${item.originalPrice}`} ÷ {item.totalUnits === item.sharersCount ? tf('{0}人', item.sharersCount) : tf('{0}份', item.totalUnits)}{item.myUnits > 1 ? ` ×${item.myUnits}` : ''}</div>
                                                    </div>
                                                    <span className={`font-mono font-medium ${item.myShare < 0 ? 'text-green-600' : ''}`}>{item.myShare < 0 ? `-$${Math.abs(item.myShare)}` : `$${item.myShare}`}</span>
                                                </div>
                                            ))}
                                            <div className="pt-2 mt-2 border-t border-slate-300 space-y-1">
                                                <div className="flex justify-between text-xs text-slate-500"><span>{t('餐費小計')}</span><span>${data.base}</span></div>
                                                <div className="flex justify-between text-xs text-slate-500"><span>{tf('服務費 ({0}%)', serviceChargeRate)}</span><span>${data.serviceCharge}</span></div>
                                                {data.extra !== 0 && <div className="flex justify-between text-xs text-slate-500"><span>{t('固定加收')}</span><span>${data.extra}</span></div>}
                                                <div className="flex justify-between font-bold text-slate-800 text-base pt-1 border-t border-slate-300"><span>{t('應付總額')}</span><span>${data.total}</span></div>
                                                {data.isTreated && (
                                                    <div className="mt-2 pt-2 border-t border-amber-200 text-xs text-amber-700 font-medium">🎁 {data.treatedByIds.map(userName).join('、')} 請客</div>
                                                )}
                                            </div>
                                        </div>
                                        {data.isTreated ? (
                                            <div className="flex gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); openTreatPicker(u.id); }} className="flex-1 py-2 rounded-lg text-sm font-bold bg-amber-100 text-amber-700 hover:bg-amber-200">{t('改請客的人')}</button>
                                                <button onClick={(e) => { e.stopPropagation(); cancelTreat(u.id); }} className="flex-1 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200">{t('取消請客')}</button>
                                            </div>
                                        ) : (
                                            <button onClick={(e) => { e.stopPropagation(); openTreatPicker(u.id); }} disabled={users.length < 2}
                                                className="w-full py-2 rounded-lg text-sm font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 disabled:opacity-40 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200">
                                                {t('🎁 這餐請他')}
                                            </button>
                                        )}
                                        <button onClick={(e) => { e.stopPropagation(); copyToClipboard(u.id, u.name, data); }} className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${copiedId === u.id ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                            {copiedId === u.id ? <><Check size={16}/> {t('已複製單人明細')}</> : <><Copy size={16}/> {t('複製單人算式')}</>}
                                        </button>
                                    </div>
                                </div>
                                )}
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 w-full max-w-md sm:max-w-2xl lg:max-w-6xl mx-auto p-4 sm:px-6 bg-white border-t border-slate-200 pb-safe">
                        <div className="flex gap-3">
                            <button onClick={() => setStep(3)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200">{t('返回修改')}</button>
                            <button onClick={resetAll} className="px-4 py-3 rounded-xl font-bold text-slate-500 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors whitespace-nowrap">{t('開新的一桌')}</button>
                        </div>
                    </div>
                </div>
                )}
            </main>
            {showCalculator && renderCalculatorModal()}
            {showTagManager && renderTagManager()}
            {editingUser && renderUserTagSelector()}
            {showImportModal && renderImportModal()}
            {showInstallGuide && renderInstallGuide()}
            {portionItemId && renderPortionModal()}
            {showTreatPanel && renderTreatPanel()}
            {treatTargetId && renderTreatPicker()}
            {undoInfo && (
                <div className="fixed left-0 right-0 bottom-24 z-40 flex justify-center px-4 pointer-events-none">
                    <div className="pointer-events-auto bg-slate-800 text-white rounded-xl shadow-2xl px-4 py-3 flex items-center gap-4 max-w-sm w-full animate-fade-in">
                        <span className="text-sm flex-1 truncate">{undoInfo.label}</span>
                        <button onClick={applyUndo} className="text-sm font-bold text-green-400 hover:text-green-300 flex-shrink-0">{t('復原')}</button>
                        <button onClick={() => setUndoInfo(null)} aria-label={t('關閉提示')} className="text-slate-400 hover:text-white flex-shrink-0"><X size={16}/></button>
                    </div>
                </div>
            )}
            {copyFallbackText && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="p-4 border-b border-slate-100 bg-amber-50">
                            <h3 className="font-bold text-slate-800">{t('自動複製失敗 😢')}</h3>
                            <p className="text-xs text-slate-500 mt-1">{t('請長按下面的文字全選後手動複製。')}</p>
                        </div>
                        <textarea readOnly value={copyFallbackText} onFocus={e => e.target.select()}
                            className="flex-1 m-4 p-3 border border-slate-200 rounded-xl bg-slate-50 font-mono text-xs resize-none min-h-[200px] outline-none" />
                        <div className="p-4 pt-0">
                            <button onClick={() => setCopyFallbackText('')} className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold">{t('關閉')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<BillSplitter />);
