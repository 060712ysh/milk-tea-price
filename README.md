# 珍奶價格觀察站

簡介

珍奶價格觀察站是一個簡潔的單機式應用，用來記錄與觀察珍珠奶茶價格走勢。後端採用 Express 搭配 SQLite，前端為簡單的 HTML/Vanilla JS，並完整對應 OpenAPI 3.0 規格（見 `openspec/openapi.yaml`）。

**主要功能亮點**

- 日期輸入優化：將日期拆為 `YYYY / MM / DD` 三個輸入欄位，並實作自動跳轉以提升輸入體驗。
- 即時搜尋：在前端提供關鍵字搜尋（商品名稱或日期），即時篩選顯示結果。
- 後端符合 OpenAPI：API 規格已儲存在 `openspec/openapi.yaml`，包含 `GET /api/prices`（支援 `q`）、`POST /api/prices`、`DELETE /api/prices/{id}`。
- 資料統計：列表上方顯示「目前共有 X 筆珍奶價格紀錄」，含搜尋後的即時計數。

安裝與啟動

先確定已安裝 Node.js（建議 v16+）。在專案根目錄執行：

```bash
npm install
npm start
```

或直接啟動伺服器：

```bash
node server.js
```

伺服器預設在 `http://localhost:3000`，前端靜態檔案位於 `public/`。

專案架構（概述）

瀏覽器（前端 HTML/JS）
     │
     │ Fetch / UI
     ▼
Express 伺服器 (`server.js`)  — 提供 REST API（`/api/prices`）
     │
     │ sqlite3 driver
     ▼
SQLite 檔案（`./milktea.db`） — 包含 `prices(id, date, name, price)` 表

文字說明：
- 前端：`public/index.html`, `public/script.js`, `public/style.css`，負責表單輸入、列表呈現、即時搜尋與刪除操作。
- 後端：`server.js`（Express）處理 JSON 請求、路由與靜態檔案。API 與 `database.js` 互動執行 SQL。
- 資料庫：`database.js` 負責建立並初始化 `milktea.db`，包含 `prices` 表與必要的 schema。

開發筆記

- 已建立完整的 OpenAPI 規格檔案：`openspec/openapi.yaml`，可用 Swagger UI 或其他工具載入檢視。
- 技術決策：已移除價格排序功能以保持界面簡潔，並專注於時間序列觀察（參見 `openspec/tasks.md` 中的決策記錄）。

