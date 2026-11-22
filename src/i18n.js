// 最後更新：2026-11-23 10:30（台北時間）
// 誰幫忙的：Claude Code（Claude Opus 5.5；Claude 桌面 App）
// 修改摘要：匯入視窗改成「拍照」「上傳照片」兩顆按鈕，更新對應英文

// 介面語言。以中文原文當 key，這樣原始碼讀起來還是中文、好維護。
// 找不到對應翻譯時就原樣顯示，不會變成空白或 key 名稱。
//
// 注意：解析器用的關鍵字陣列（IMPORT_BLACKLIST / SERVICE_WORDS / DISCOUNT_WORDS）
// 不在這裡翻譯——那是比對帳單文字用的資料，不是介面文案。

export const EN = {
  // --- 通用 ---
  '聚餐友善分帳機': 'Meal Splitter',
  '上一步': 'Back',
  '完成': 'Done',
  '取消': 'Cancel',
  '關閉': 'Close',
  '復原': 'Undo',
  '改': 'Edit',
  '份': '',
  '或': 'or',
  '按鈕': 'button',
  '選單': 'menu',
  '分享': 'Share',
  '項目': 'item',
  '這個標籤': 'this tag',
  '自訂': 'Custom',

  // --- 第 1 步：成員 ---
  '一般': 'Regular',
  '吃素': 'Vegetarian',
  '朋友 A': 'Friend A',
  '朋友 B (素)': 'Friend B (veg)',
  '可以自訂': 'You can create your own tags like',
  '「🥦 素食」': '"🥦 Vegetarian"',
  '「🍺 只喝酒」': '"🍺 Drinks only"',
  '等標籤，之後一鍵就能分給同標籤的人。': '— then assign a dish to a whole group with one tap.',
  '管理 / 新增標籤': 'Manage / add tags',
  '管理群組標籤': 'Manage group tags',
  '新增自訂標籤': 'Add a custom tag',
  '新增標籤': 'Add tag',
  '群組名稱 (如: 喝酒)': 'Group name (e.g. Drinks)',
  '選擇標籤': 'Choose a tag',
  '選擇標籤圖示': 'Choose tag icon',
  '更改標籤': 'Change tag',
  '刪除標籤': 'Delete tag',
  '新增朋友': 'Add person',
  '成員名字': 'Name',
  '輸入名字': 'Enter a name',
  '刪除成員': 'Remove person',
  '下一步：輸入菜色': 'Next: add the food',
  '清空這桌，重新開始': 'Clear this table and start over',
  'Designed by 王柏文': 'Designed by 王柏文',

  // --- 第 2 步：輸入方式 ---
  '怎麼輸入菜色？': 'How do you want to add the food?',
  '隨時可以切換，選一個開始': 'You can switch at any time — just pick one to start',
  '手動輸入': 'One at a time',
  '一道道加，邊加邊選誰有吃。適合菜不多或邊點邊記。':
    'Add each dish and tick who ate it as you go. Best for short bills, or noting things down as you order.',
  '大量匯入': 'Import the whole bill',
  '拍照或貼上整張帳單，匯入後會': 'Snap or paste the whole bill. Then it walks you through',
  '一道道跳出卡片': 'one dish at a time',
  '讓你確認誰有吃。': 'so you can tick who ate what.',
  '拍照就由 AI 讀出每道菜和金額': 'Snap a photo and AI reads every dish and price',
  '推薦': 'Recommended',
  '上一步：改成員': 'Back: edit people',
  '回到清單': 'Back to list',

  // --- 第 3 步：輸入菜色 ---
  '品項（如：椒麻雞）': 'Item (e.g. fried chicken)',
  '品項名稱': 'Item name',
  '金額': 'Amount',
  '打開計算機': 'Open calculator',
  '計算機': 'Calculator',
  '輔助計算機': 'Calculator',
  '確認金額': 'Use this amount',
  '算式有誤': 'Invalid expression',
  '匯入整張帳單': 'Paste bill text',
  '拍照或貼上，一次匯入整張帳單': 'Snap or paste to import the whole bill',
  '誰有吃': 'Who ate',
  '這道菜誰有吃？': 'Who ate this?',
  '全選': 'Everyone',
  '大家都有': 'Everyone',
  '自訂名單': 'Custom',
  '加入清單': 'Add to list',
  '收起輸入區': 'Collapse input panel',
  '收起輸入區，方便看下面的清單': 'Collapse the input panel to see the list below',
  '展開輸入區': 'Expand input panel',
  '展開輸入區，選誰有吃': 'Expand the input panel to pick who ate it',
  '還沒有點菜喔！': 'Nothing added yet.',
  '分配給:': 'Shared by:',
  '未分配': 'Unassigned',
  '刪除這道菜': 'Delete this item',
  '調整份數': 'Adjust portions',
  '計算分帳': 'Work out the split',

  // --- 份數 ---
  '有人吃兩份就加份數，不用重複輸入。':
    'If someone had two servings, raise their portion instead of entering the dish twice.',
  '增加份數': 'Increase portions',
  '減少份數': 'Decrease portions',
  '這道菜還沒有人分攤。': 'Nobody is sharing this item yet.',
  '⚖️ 份數': '⚖️ Portions',

  // --- 匯入視窗 ---
  '① 拍下帳單': '① Photograph the bill',
  '傳給 ChatGPT 或 Gemini →': 'and send it to ChatGPT or Gemini →',
  '② 複製下面的指令': '② Copy the prompt below',
  '一起貼過去 →': 'and paste it alongside →',
  '📋 複製給 AI 的指令': '📋 Copy the prompt for AI',
  '✓ 已複製，貼給 AI 就好': '✓ Copied — paste it to the AI',
  '看看指令寫了什麼（可自行修改）': 'See what the prompt says (you can edit it)',
  '收起指令內容': 'Hide the prompt',
  '給 AI 的指令': 'Prompt for AI',
  '在此貼上明細': 'Paste the bill here',
  '貼上': 'Paste',
  '無法自動貼上，請手動貼上': 'Could not paste automatically — please paste manually',
  '開始匯入': 'Import',

  // --- 逐筆卡片檢視 ---
  '品名': 'Item',
  '品名或金額有錯？直接在上面改': 'Misread the name or amount? Edit it right here',
  '這道不用算，刪掉': "Don't count this — delete it",
  '上一道': 'Previous',
  '確認，下一道': 'Confirm, next',
  '完成檢視': 'Finish review',
  '略過，直接看全部清單': 'Skip the review, show the full list',
  '逐筆檢查': 'Review one by one',

  // --- 第 4 步：結算 ---
  '總金額 (含服務費)': 'Total (incl. service)',
  '服務費率': 'Service charge',
  '服務費率加 1%': 'Increase service charge by 1%',
  '服務費率減 1%': 'Decrease service charge by 1%',
  '免服務費': 'None',
  '固定加收': 'Fixed extra',
  '固定加收金額': 'Fixed extra amount',
  '清潔費等，全員均分、不加服務費': 'Cleaning fee etc. — split evenly, no service charge applied',
  '💳 這桌誰先付？': '💳 Who paid the bill?',
  '會寫進複製的結算單': 'Included in the copied summary',
  '不指定': 'Nobody',
  '🎁 安排請客': '🎁 Set up a treat',
  '複製全員結算單': 'Copy full summary',
  '覺得好用？加到主畫面': 'Like it? Add to home screen',
  '詳細分帳結果': 'Breakdown',
  '點擊查看算式': 'Tap to see the maths',
  '點擊收合': 'Tap to collapse',
  '餐費小計': 'Food subtotal',
  '應付總額': 'Total due',
  '複製單人算式': 'Copy this person',
  '已複製單人明細': 'Copied',
  '已複製全員結算單！': 'Full summary copied!',
  '返回修改': 'Back to edit',
  '開新的一桌': 'New table',

  // --- 請客 ---
  '選一個人，再決定誰要請他': 'Pick a person, then choose who is covering them',
  '還沒有安排任何請客。': 'No treats set up yet.',
  '請他': 'Treat',
  '改請客的人': 'Change who pays',
  '取消請客': 'Cancel treat',
  '大家一起請': 'Everyone chips in',
  '確認請客': 'Confirm',
  '沒有其他人可以請客': 'There is nobody else to cover this',
  '🎁 這餐請他': '🎁 Treat this person',

  // --- 安裝說明 ---
  '📲 安裝到主畫面': '📲 Add to home screen',
  '加入主畫面': 'Add to Home Screen',
  '安裝應用程式': 'Install app',
  '✨ 就能像 App 一樣全螢幕使用！': '✨ It then runs full screen, just like an app.',

  // --- 複製失敗備援 ---
  '自動複製失敗 😢': 'Could not copy automatically 😢',
  '請長按下方文字，全選後複製。': 'Long-press the text below to select and copy it manually.',

  // --- 匯入略過原因 ---
  '收據雜訊': 'not an item',
  '服務費類，請在結算頁設定': 'service charge — set it on the summary screen',
  '找不到金額': 'no amount found',
  '金額無效': 'invalid amount',
  '金額異常': 'amount looks wrong',
  '沒有品名': 'no item name',

  // --- 其他提示 ---
  '金額好像太大，請確認。': 'That amount looks too large — please double-check.',
  '這個標籤還沒有成員。': 'Nobody is in this tag yet.',
  '讀取存檔失敗，從空白開始': 'Could not read saved data — starting fresh',
  '自動存檔失敗（可能是無痕模式或空間不足）': 'Auto-save failed (private mode, or storage full)',
  '關閉提示': 'Dismiss',
  '關閉計算機': 'Close calculator',
  // --- 拍照辨識（2026-11-23）---
  '匯入整張帳單': 'Import the whole bill',
  'AI 正在讀帳單…': 'AI is reading the bill…',
  '通常 10 到 30 秒': 'Usually 10–30 seconds',
  'AI 會讀出每道菜和金額': 'AI reads every dish and price',
  '讓 AI 讀帳單': 'Let AI read the receipt',
  '拍照': 'Take photo',
  '上傳照片': 'Upload photo',
  '上傳最多 {0} 張': 'Upload up to {0}',
  '照片會送到 Google Gemini 辨識，本站不保存；Google 可能用來改善服務。': "Photos are sent to Google Gemini to be read. This site doesn't keep them; Google may use them to improve its services.",
  '收起手動貼上': 'Hide manual paste',
  '想自己貼明細？點這裡': 'Prefer to paste the bill yourself? Tap here',
  '③ 按 AI 回覆裡程式碼框的「複製」，貼回這裡': "③ Tap “Copy” on the code block in the AI's reply, then paste it here",
  '範例：\n宮保雞丁 180\n炒高麗菜 100\n台灣啤酒 60': 'Example:\nKung Pao Chicken 180\nStir-fried Cabbage 100\nTaiwan Beer 60',
  'AI 備註': 'AI note',
  '今天的 AI 額度用完了，請改用下方自己貼明細。': "Today's AI allowance is used up. Please paste the bill yourself below.",
  '拍照辨識還沒開通，請改用下方自己貼明細。': "Photo reading isn't switched on yet. Please paste the bill yourself below.",
  '照片太大，請重拍一張。': 'That photo is too large. Please take another one.',
  '這張照片讀不出來，請換一張或重拍。': "This photo can't be read. Choose another one or retake it.",
  'AI 讀太久了，請再試一次，或改用下方自己貼明細。': 'The AI took too long. Try again, or paste the bill yourself below.',
  '照片裡找不到品項，請拍清楚一點，或改用下方自己貼明細。': 'The AI found no items in the photo. Take a clearer photo, or paste the bill yourself below.',
  'AI 暫時讀不到，請再拍一次，或改用下方自己貼明細。': "The AI couldn't read this photo right now. Take it again, or paste the bill yourself below.",

  '歡迎！先設定成員和標籤。': 'Welcome! Add the people and tag them.',
  '請輸入有效金額（不能是 0 或空白）。\n\n折扣請打負數，例如 -50。':
    'Please enter a valid amount.\n\nIt cannot be 0 or blank.\nFor a discount, use a negative number such as -50.',
  '無法辨識 😢\n\n每行要有「菜名」和「金額」，例如：\n宮保雞丁 180':
    'Could not read any items 😢\n\nMake sure each line has an item name and an amount, e.g.\nKung Pao Chicken 180',

  // --- 帶變數的句子（用 {0} {1} 當佔位符，搭配 tf() 使用）---
  '共 {0} 道': '{0} items',
  '· {0}人': '· {0}',
  '管理標籤 ({0})': 'Tags ({0})',
  '已自動儲存 · {0}': 'Saved · {0}',
  '朋友 {0}': 'Friend {0}',
  '已刪除「{0}」': 'Deleted "{0}"',
  '已刪除成員「{0}」': 'Removed "{0}"',
  '已刪除標籤「{0}」': 'Deleted tag "{0}"',
  '確定要刪掉「{0}」嗎？': 'Delete "{0}"?',
  '「{0}」至少要有一個人分攤。\n\n不要這道菜的話，請按右上角的垃圾桶刪除。':
    'At least one person must share "{0}".\n\nTo remove this item, use the bin icon instead.',
  '「{0}」還沒有成員。\n\n請回上一步，把成員改成這個標籤。':
    'Nobody is tagged "{0}" yet.\n\nGo back a step and assign this tag to someone first.',
  '「{0}」有 {1} 位成員。\n\n刪除後他們會改成「{2}」，相關菜色會變成「自訂名單」。\n\n確定刪除？':
    '{1} people are tagged "{0}".\n\nThey will be moved to "{2}", and any dishes using this tag become "Custom".\n\nDelete it?',
  '刪掉這個人後，這些菜會沒人分攤：\n\n{0}\n\n金額會標成「未分配」，不算進任何人的帳單。\n\n確定刪除？':
    'Removing this person leaves these items with nobody sharing them:\n\n{0}\n\nTheir amounts will be marked "Unassigned" and left out of everyone\'s total.\n\nRemove anyway?',
  '清空這桌、重新開始？\n\n成員、菜色和請客設定都會清除，無法復原。':
    'Clear this table and start over?\n\nEveryone, every item and every treat will be removed. This cannot be undone.',
  '有 {0} 行沒有匯入': '{0} lines were not imported',
  '・…等 {0} 行': '・…and {0} more',
  '⚖️ {0} 的份數': '⚖️ Portions for {0}',
  '{0} ÷ {1} 份 = 每份 ${2}': '{0} ÷ {1} portions = ${2} each',
  '應付 ${0}': 'Owes ${0}',
  '🎁 誰要請 {0}？': '🎁 Who is treating {0}?',
  '{0} 這餐是 ${1}': "{0}'s share is ${1}",
  '{0} 人一起請 → 每人多付 ${1}': '{0} people chipping in → ${1} each',
  '目前 {0} 人': '{0} people',
  '{0} 份': '{0} portions',
  '已輸入 {0} 道，切換不會清掉': 'You have {0} items — switching won\'t clear them',
  '🎁 {0} 請客': '🎁 Treated by {0}',
  '有 ${0} 沒有分配給任何人': '${0} is not assigned to anyone',
  '，每份 ${0}': ', ${0} each',
  '{0} 沒有人分攤，這些金額': '{0}: no one is assigned, so these amounts ',
  '不會': 'are not',
  '算進任何人的帳單。請替它們選人，或直接刪除。': ' included in anyone\'s total. Assign people to them, or delete them.',
  '服務費 ({0}%)': 'Service ({0}%)',
  '{0}人': '{0} people',
  '{0}份': '{0} portions',
};

// 帶變數的翻譯：tf('共 {0} 道', 5)
export const makeTf = (lang) => (zh, ...vals) => {
  const tpl = lang === 'en' && EN[zh] !== undefined ? EN[zh] : zh;
  return vals.reduce((acc, v, i) => acc.split('{' + i + '}').join(String(v)), tpl);
};

export const makeT = (lang) => (zh) => (lang === 'en' ? (EN[zh] !== undefined ? EN[zh] : zh) : zh);
