# Development notes / 開發紀錄

These are the working documents from rebuilding this tool. They are kept in the open
because the process itself may be useful to read — especially the parts where the
automated review was wrong and only found out by actually running the app.

這裡是這個工具改版過程的工作文件。公開保留是因為過程本身值得一讀——
尤其是那些「只讀程式碼判斷錯了、實際跑過才發現真相」的部分。

| File | What it is |
|---|---|
| [`優化建議-Claude-Opus-5-Medium.md`](聚餐友善分帳機-優化建議-Claude-Opus-5-Medium.md) | First review pass by Claude Opus 5. Found the import-corruption bugs and the cascading "add a person mid-way" bug. Missed a P0.<br>Claude Opus 5 的第一輪檢查。抓到匯入資料損毀與「中途加人」的連鎖錯誤，但漏了一個 P0。 |
| [`優化建議-Codex-GPT-5.6-Luna-極高.md`](聚餐友善分帳機-優化建議-Codex-GPT-5.6-Luna-極高.md) | Independent review pass by Codex GPT-5.6. Found the P0 where money silently vanished, plus the thousands-separator bug.<br>Codex GPT-5.6 的獨立檢查。抓到「金額靜默消失」的 P0，以及千分位解析錯誤。 |
| [`優化與開發規劃-合併版-Claude-Opus-5-Medium.md`](聚餐友善分帳機-優化與開發規劃-合併版-Claude-Opus-5-Medium.md) | The merged plan and the actual build log — 19 original bugs plus 6 found during implementation, every fix with its verification numbers, and the design decisions behind each feature.<br>合併後的規劃與實際施工紀錄：19 項原始錯誤加上 6 項實作中發現的新問題，每一項修正都附驗收數字，以及每個功能背後的設計取捨。 |

### The short version / 濃縮版

The two review passes overlapped less than expected. Codex systematically probed boundary
conditions (zero people, zero amounts, negatives, thousands separators) and caught structural
holes. Claude ran one realistic scenario end to end — pasting a bill that looked like a real
receipt — and caught the dirty-data problems. **Both methods were necessary**; neither alone
would have found everything.

兩輪檢查的重疊比預期少。Codex 系統性地戳邊界條件（0 人、0 元、負數、千分位），抓到結構性漏洞；
Claude 跑了一次擬真情境（貼一張像真的帳單），抓到髒資料問題。**兩種測法都必要**，少了任一種都會漏。
