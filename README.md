<div align="center">

# 💸 Meal Splitter

### 聚餐友善分帳機

**Vegetarians, non-drinkers, people who only had a dish or two — group meals are hard to split fairly. Let everyone pay for just what they ate.**

**吃素的、沒喝酒的、只吃幾道菜的——聚餐分帳很難喬？讓每個人只付自己吃的。**

<br>

## 🍽️ &nbsp; [**Open the app · 立即使用**](https://allen365apple.github.io/meal-splitter/) &nbsp; 🍽️

<br>

`Free` &nbsp;·&nbsp; `No sign-up` &nbsp;·&nbsp; `No install` &nbsp;·&nbsp; `English + 繁體中文`

免費 &nbsp;·&nbsp; 免註冊 &nbsp;·&nbsp; 免安裝 &nbsp;·&nbsp; 手機瀏覽器直接開

</div>

---

Type or paste the dishes, tick who ate each one, and Meal Splitter works out exactly what each person owes — down to the last dollar — then hands you a summary you can drop straight into your group chat.

> 輸入或貼上菜色、勾選每道菜誰有吃，它就算出每個人該付多少（精確到 1 元不差），再給你一段可以直接貼進群組的結算訊息。

### It's built for the bills that are annoying to split

- 🥦 &nbsp; Someone's **vegetarian** and didn't touch the meat dishes
- 🍺 &nbsp; **Drinks** that not everyone shared
- 🍽️ &nbsp; One **steak** among six set menus
- ⚖️ &nbsp; Someone ate **two portions** of the same dish
- 🎁 &nbsp; You're **treating** a friend, but not everyone
- 💳 &nbsp; One person **paid the whole bill** — who owes them what?

> **最適合這些難分的帳單：** 有人吃素沒動肉 · 酒水喝得不平均 · 六個套餐裡一份牛排 · 有人吃了兩份 · 你想請其中一個人 · 一個人先付、其他人要轉錢給他

Split it evenly and the light eaters quietly subsidise the heavy ones. Meal Splitter makes each person pay for what they actually had.

> 平均分就是讓吃少的人默默補貼吃多的人。這個工具讓每個人付自己真正吃掉的部分。

**Read on — 往下看：** &nbsp; [English](#english) &nbsp;·&nbsp; [繁體中文](#繁體中文)

---

## English

### What is this?

A free web tool for splitting restaurant bills **fairly**, when "total ÷ number of people" isn't fair.

You enter each dish and tick who actually ate it. The tool works out what each person owes, down to the last dollar, and gives you one block of text you can paste straight into your group chat.

### Why not just divide the total?

Because at a real dinner, people don't eat the same things:

- Someone is **vegetarian** and didn't touch the three meat dishes
- Three people **shared a bottle of wine**; two people were driving
- One person **ordered the steak**; everyone else had the set menu
- Someone **ate two portions** of the same dish
- One person **arrived late** and only had dessert
- You're **treating a friend**, but the others aren't

Dividing the total makes the light eaters quietly subsidise the heavy ones. This tool makes each person pay for what they actually had.

### Features

| | |
|---|---|
| 🏷️ **Group tags** | Tag people as `😋 regular`, `🥦 vegetarian`, `🍺 drinking`, `👶 kids` — anything you like. Then assign a dish to a whole group with one tap. |
| 📋 **Paste a whole bill at once** | Paste the itemised receipt as text and it parses every line. Handles thousands separators (`$1,200`), discounts (`-50`), and skips receipt noise (subtotal, service charge, tax, phone number…). |
| 🤖 **Photo → text via AI** | Can't be bothered typing? Photograph the receipt, ask ChatGPT or Gemini to turn it into plain text, paste it in. The app gives you the prompt to copy. |
| 🃏 **One-dish-at-a-time review** | After a bulk import, the app walks you through the dishes one card at a time so you can tick who ate what — instead of going back and poking at a long list. Editable names and prices, so parsing mistakes get fixed on the spot. |
| ⚖️ **Portion weights** | Someone had two servings? Set their portion to 2 instead of entering the dish twice. |
| 🎁 **Treating someone** | Mark that someone's share is being covered, and by whom. Their itemised total stays visible and correct — the treat is recorded as a note, so nobody's breakdown gets polluted. |
| 💳 **Who paid first** | Say who put it on their card; the copied summary tells everyone to transfer to that person. |
| 🧮 **Service charge & fixed extras** | Any rate from 0–100%, typed directly. Plus a fixed add-on (cleaning fee, corkage) that's split evenly and *not* multiplied by the service charge. |
| 🔢 **The numbers always add up** | Every amount is computed in integer cents and distributed by the largest-remainder method. Line items sum to the subtotal, subtotal + service + extras equals the person's total, and everyone's totals sum to exactly the bill. No mystery dollar. |
| 📄 **One-tap copy** | Copy the whole settlement, or one person's breakdown, as plain text ready for a group chat. |
| 💾 **Auto-save** | Your table is saved in your browser as you go. Switch apps to check the receipt photo and come back — nothing is lost. |
| ↩️ **Undo** | Deleted the wrong dish or person? There's an undo. |
| 📲 **Add to home screen** | Installs like an app. Full screen, no browser chrome. |

### When is this most useful?

**It's worth using when:**

- 🥦 **Someone has dietary restrictions** — vegetarian, halal, allergies. They shouldn't pay for dishes they couldn't eat.
- 🍺 **Alcohol is involved** — drinks are often the biggest and most unevenly consumed part of the bill.
- 🍽️ **The order was uneven** — one steak among six set meals, one expensive bottle, one shared dessert.
- 👥 **It's a big group** (6+) — the arithmetic gets tedious and error-prone fast.
- 💸 **The bill is large** — at NT$5,000+, a rough split can be off by hundreds per person.
- 🎁 **Someone is being treated** — a birthday, a thank-you, a new colleague.
- 😬 **Nobody wants to be the one to bring it up** — a neutral, itemised breakdown takes the awkwardness out of asking.

**It's overkill when:** two people split a NT$300 lunch, or everyone genuinely ordered the same set meal. Just divide it.

### How to use it

1. **Add people** and tag them (vegetarian, drinking, and so on).
2. **Choose how to enter the food** — one dish at a time, or paste the whole bill.
3. **Enter the dishes** and tick who ate each one.
4. **Read the result**, set the service charge, note any treats, and copy it to your group chat.

### Privacy

Everything runs in your browser. There is no backend, no account, no analytics, and no data leaves your device. Your saved table lives in your own browser's local storage and is never uploaded.

### Tech notes

Pre-built static site — React 18 bundled with esbuild, styles from Tailwind CSS. No CDN dependency at runtime, so it loads fast and keeps working even if a third-party CDN has a bad day.

```bash
npm install
npm run build     # builds into docs/
npm run serve     # preview at http://localhost:8777
```

```
src/app.jsx              the whole app
src/app.css              Tailwind entry + custom styles
src/index.html           HTML template
docs/                    build output — this is what GitHub Pages serves
legacy/                  the original single-file version, kept for reference
notes/                   development notes, including the two review passes
```

### Licence

MIT. Use it, fork it, deploy your own copy.

---

## 繁體中文

### 這是什麼？

一個免費的網頁工具，專門解決「總額除以人數不公平」的聚餐分帳問題。

你把每道菜輸入進去、勾選誰有吃，它會算出每個人該付多少（精確到 1 元不差），最後給你一段可以直接貼進群組的文字。

### 為什麼不直接除以人數？

因為真實的聚餐，大家吃的東西根本不一樣：

- 有人**吃素**，三道肉完全沒動
- 三個人**分了一瓶酒**，另外兩個人開車沒喝
- 一個人**點了牛排**，其他人吃套餐
- 有人**同一道菜吃了兩份**
- 有人**遲到**，只吃到甜點
- 你想**請其中一個人**，但不是請全部

平均分就是讓吃少的人默默補貼吃多的人。這個工具讓每個人付自己真正吃掉的部分。

### 有什麼功能

| | |
|---|---|
| 🏷️ **群組標籤** | 把成員標成 `😋 一般`、`🥦 吃素`、`🍺 喝酒`、`👶 小孩`，想加什麼都可以。之後一鍵就能把某道菜分給整個群組。 |
| 📋 **整張帳單一次貼上** | 把明細貼進去，它會逐行解析。**支援千分位**（`$1,200`）、**折扣負數**（`-50`），並自動跳過小計、服務費、稅額、電話這類收據雜訊。 |
| 🤖 **拍照 → 文字（用 AI）** | 懶得打字？拍下帳單，請 ChatGPT 或 Gemini 轉成純文字再貼過來。App 裡直接有指令可以複製。 |
| 🃏 **逐筆卡片檢視** | 大量匯入後，會**一道菜一張卡片**帶你確認誰有吃，不用自己回頭在長清單裡一個一個點。卡片上還能直接改品名和金額，解析錯了當場修掉。 |
| ⚖️ **份數權重** | 有人吃了兩份？把份數設成 2 就好，不用把同一道菜輸入兩次。 |
| 🎁 **請客註記** | 標記某個人的金額由誰來請。**他自己的明細和金額完整保留**，請客只是附註，不會把別人的明細弄亂。 |
| 💳 **誰先付錢** | 選出先刷卡的人，複製出來的結算單會告訴大家轉帳給他。 |
| 🧮 **服務費與固定加收** | 服務費 0～100% 直接輸入。另外可以加「固定加收」（清潔費、開瓶費），全員均分且**不會被乘上服務費**。 |
| 🔢 **金額一定對得上** | 全程以整數「分」計算，用最大餘數法分配。**明細各行加總 = 餐費小計；小計＋服務費＋加收 = 個人應付；所有人加總 = 帳單總額。** 不會有那一塊錢不知道跑去哪。 |
| 📄 **一鍵複製** | 複製全員結算單，或單獨複製某個人的算式，直接貼群組。 |
| 💾 **自動存檔** | 邊輸入邊存在你的瀏覽器裡。切出去看帳單照片再回來，資料不會消失。 |
| ↩️ **刪錯可以復原** | 誤刪菜色或成員都能還原。 |
| 📲 **加到主畫面** | 可以像 App 一樣安裝，全螢幕使用。 |

### 什麼情況最適合用

**這些時候很值得用：**

- 🥦 **有人吃素或有飲食限制** — 吃素、清真、食物過敏。他不該為自己不能吃的菜付錢。
- 🍺 **有喝酒** — 酒水常常是帳單裡金額最大、又最不平均的部分。
- 🍽️ **點的東西差很多** — 六個套餐裡有一份牛排、一瓶貴的酒、一份大家分的甜點。
- 👥 **人多**（6 人以上）— 人一多，心算很快就會亂掉也容易錯。
- 💸 **金額大** — 五千元以上的帳單，隨便抓一個數字可能每人差好幾百。
- 🎁 **有人要被請** — 生日、答謝、新同事第一次聚餐。
- 😬 **沒人想當開口要錢的那個人** — 一份中立、有明細的結算單，可以讓「跟大家收錢」這件事不尷尬。

**這些時候不必用：** 兩個人吃 300 元的午餐，或者大家真的都點一樣的套餐。直接除就好。

### 怎麼用

1. **加入成員**並標好標籤（吃素、喝酒等等）。
2. **選擇輸入方式** — 一道一道加，或整張帳單貼上。
3. **輸入菜色**，勾選每道菜誰有吃。
4. **看結果**，調服務費、標記請客，然後複製貼群組。

### 隱私

全部在你的瀏覽器裡執行。**沒有後端、沒有帳號、沒有分析追蹤，任何資料都不會離開你的裝置。** 存檔只存在你自己瀏覽器的本機儲存空間，不會上傳。

### 技術說明

預先建置的靜態網站 — React 18 以 esbuild 打包，樣式用 Tailwind CSS。**執行時不依賴任何 CDN**，所以載入快，第三方 CDN 出問題也不會整頁空白。

```bash
npm install
npm run build     # 建置到 docs/
npm run serve     # 在 http://localhost:8777 預覽
```

```
src/app.jsx              主程式
src/app.css              Tailwind 入口與自訂樣式
src/index.html           HTML 模板
docs/                    建置產出 — GitHub Pages 讀這個資料夾
legacy/                  最初的單檔版本，保留作參考
notes/                   開發紀錄，包含兩輪獨立檢查報告
```

### 授權

MIT。歡迎使用、fork、自己部署一份。

---

<div align="center">

<sub>**Also known as / 相關關鍵字:** bill splitter · split the bill · split a restaurant bill · itemised bill split · group dining calculator · who-owes-what · fair split · AA · 分帳 · 分帳工具 · 聚餐分帳 · 帳單分攤 · AA 制 · 均攤 · 拆帳 · 誰吃什麼付什麼</sub>

<br>

<sub>Designed by 王柏文 · Built with Claude Code</sub>

</div>
