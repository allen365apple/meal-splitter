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
  '等標籤，等等只要一鍵就能只分帳給這個標籤的人！': '— then assign a dish to a whole group with one tap.',
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
  '兩種都可以隨時切換，選一個開始就好': 'You can switch at any time — just pick one to start',
  '手動輸入': 'One at a time',
  '一道一道加，邊加邊選誰有吃。菜色不多、或是想邊點邊記的時候最順。':
    'Add each dish and tick who ate it as you go. Best for short bills, or noting things down as you order.',
  '大量匯入': 'Paste the whole bill',
  '一次貼上整張明細。匯入後會': 'Paste the itemised bill in one go. Then it walks you through',
  '一道一道跳卡片': 'one dish at a time',
  '讓你確認誰有吃，不用自己回頭一個一個點。': 'so you can tick who ate what — no going back through a long list.',
  '可以拍帳單請 ChatGPT 轉成文字再貼過來': 'Photograph the receipt and let ChatGPT turn it into text',
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
  '貼上文字明細': 'Paste bill text',
  '貼上文字明細，一次匯入整張帳單': 'Paste bill text to import the whole bill at once',
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
  '有人吃兩份就把份數加上去，不用把這道菜輸入兩次。':
    'If someone had two servings, raise their portion instead of entering the dish twice.',
  '增加份數': 'Increase portions',
  '減少份數': 'Decrease portions',
  '這道菜還沒有人分攤。': 'Nobody is sharing this item yet.',
  '⚖️ 份數': '⚖️ Portions',

  // --- 匯入視窗 ---
  '懶得打字？拍帳單給 AI 就好': "Don't fancy typing? Photograph the receipt",
  '① 拍下帳單': '① Photograph the bill',
  '傳給 ChatGPT 或 Gemini →': 'and send it to ChatGPT or Gemini →',
  '② 複製下面的指令': '② Copy the prompt below',
  '一起貼過去 →': 'and paste it alongside →',
  '③ 把 AI 回覆的明細貼回這裡': "③ Paste the AI's reply back here",
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
  '品名或金額認錯了？可以直接在上面改': 'Misread the name or amount? Edit it right here',
  '這道不用算，刪掉': "Don't count this — delete it",
  '上一道': 'Previous',
  '確認，下一道': 'Confirm, next',
  '完成檢視': 'Finish review',
  '略過檢視，直接看全部清單': 'Skip the review, show the full list',
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
  '✨ 這樣就能像 APP 一樣全螢幕使用囉！': '✨ It then runs full screen, just like an app.',

  // --- 複製失敗備援 ---
  '自動複製失敗 😢': 'Could not copy automatically 😢',
  '請長按下面的文字全選後手動複製。': 'Long-press the text below to select and copy it manually.',

  // --- 匯入略過原因 ---
  '收據雜訊': 'not an item',
  '服務費類，請在結算頁設定': 'service charge — set it on the summary screen',
  '找不到金額': 'no amount found',
  '金額無效': 'invalid amount',
  '金額異常': 'amount looks wrong',
  '沒有品名': 'no item name',

  // --- 其他提示 ---
  '金額好像太大了，請確認一下。': 'That amount looks too large — please double-check.',
  '這個標籤目前沒有成員喔！': 'Nobody is in this tag yet.',
  '讀取存檔失敗，從空白開始': 'Could not read saved data — starting fresh',
  '自動存檔失敗（可能是無痕模式或空間不足）': 'Auto-save failed (private mode, or storage full)',
  '關閉提示': 'Dismiss',
  '關閉計算機': 'Close calculator',
  '歡迎！請設定成員並標記標籤。': 'Welcome! Add the people and tag them.',
  '請輸入有效金額。\n\n不能是 0 或空白。\n如果要輸入折扣，請打負數，例如 -50。':
    'Please enter a valid amount.\n\nIt cannot be 0 or blank.\nFor a discount, use a negative number such as -50.',
  '無法辨識內容 😢\n\n請確保每一行包含「菜名」與「金額」，例如：\n宮保雞丁 180':
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
  '「{0}」至少要有一個人分攤喔！\n\n如果這道菜要取消，請直接按右上角的垃圾桶刪除。':
    'At least one person must share "{0}".\n\nTo remove this item, use the bin icon instead.',
  '「{0}」目前沒有成員喔！\n\n請先回上一步，把成員的標籤改成這一個。':
    'Nobody is tagged "{0}" yet.\n\nGo back a step and assign this tag to someone first.',
  '「{0}」目前有 {1} 位成員。\n\n刪除後他們會被改成「{2}」，相關菜色會變成「自訂名單」。\n\n確定要刪除嗎？':
    '{1} people are tagged "{0}".\n\nThey will be moved to "{2}", and any dishes using this tag become "Custom".\n\nDelete it?',
  '刪掉這個人之後，下面這些菜會變成沒有人分攤：\n\n{0}\n\n這些金額會被標成「未分配」，不會算進任何人的帳單。\n\n確定要刪除嗎？':
    'Removing this person leaves these items with nobody sharing them:\n\n{0}\n\nTheir amounts will be marked "Unassigned" and left out of everyone\'s total.\n\nRemove anyway?',
  '要清空目前這桌，重新開始嗎？\n\n所有成員、菜色與請客設定都會清除，這個動作無法復原。':
    'Clear this table and start over?\n\nEveryone, every item and every treat will be removed. This cannot be undone.',
  '已經輸入 {0} 道，切換不會清掉它們': 'You have {0} items — switching will not clear them',
  '有 {0} 行沒有匯入': '{0} lines were not imported',
  '・…等 {0} 行': '・…and {0} more',
  '⚖️ {0} 的份數': '⚖️ Portions for {0}',
  '{0} ÷ {1} 份 = 每份 ${2}': '{0} ÷ {1} portions = ${2} each',
  '應付 ${0}': 'Owes ${0}',
  '🎁 {0} 請客': '🎁 Treated by {0}',
  '🎁 誰要請 {0}？': '🎁 Who is treating {0}?',
  '{0} 這餐是 ${1}': "{0}'s share is ${1}",
  '{0} 人一起請 → 每人多付 ${1}': '{0} people chipping in → ${1} each',
  '目前 {0} 人': '{0} people',
  '{0} 份': '{0} portions',
  '，每份 ${0}': ', ${0} each',
  '有 ${0} 沒有分配給任何人': '${0} is not assigned to anyone',
  '{0} 目前沒有人分攤，這些金額': '{0} currently have nobody sharing them. These amounts are',
  '算進任何人的帳單。請幫這些項目選人，或直接刪除。': 'included in anyone\'s total. Assign people to them, or delete them.',
  '服務費 ({0}%)': 'Service ({0}%)',
  '{0}人': '{0} people',
  '{0}份': '{0} portions',
  '×{0}': '×{0}',
};

// 帶變數的翻譯：tf('共 {0} 道', 5)
export const makeTf = (lang) => (zh, ...vals) => {
  const tpl = lang === 'en' && EN[zh] !== undefined ? EN[zh] : zh;
  return vals.reduce((acc, v, i) => acc.split('{' + i + '}').join(String(v)), tpl);
};

export const makeT = (lang) => (zh) => (lang === 'en' ? (EN[zh] !== undefined ? EN[zh] : zh) : zh);
