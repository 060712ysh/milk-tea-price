# 開發紀錄 - 珍奶價格觀察站

以下以時間與主題順序記錄專案從初始化到目前完成的工作，方便回顧與交接。

- [x] 環境初始化與專案架構
  - 建立 Node.js 專案骨架，安裝必要套件：`express`、`sqlite3`、`cors`。
  - 新增啟動檔 `server.js` 與靜態資源目錄 `public/`。

- [x] 資料庫：建立 SQLite 並初始化 `prices` 表
  - 建立 `database.js`，以 `sqlite3` 開啟或建立 `./milktea.db`。
  - 建立資料表 `prices(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, name TEXT, price INTEGER)`。
  - 使用參數化查詢避免 SQL 注入風險。

- [x] 後端功能開發（API）
  - `POST /api/prices`：驗證 request body（`date`, `name`, `price`），以參數化 SQL 插入資料，回傳 `201` 與建立的紀錄。
  - `GET /api/prices?q=keyword`：回傳紀錄陣列，若帶 `q` 則以 `LIKE` 模糊比對 `name` 或 `date`，回傳 `200`。
  - `DELETE /api/prices/:id`：依 `id` 刪除紀錄，回傳成功訊息；若發生 DB 錯誤回傳 `500`。

- [x] 前端 UI/UX 優化
  - 拆分日期輸入為三個欄位（`YYYY` / `MM` / `DD`），使用 `inputmode="numeric"` 與 `maxlength` 限制輸入。
  - 實作自動跳轉（當年四位輸入完成或月兩位完成時自動 focus 下一欄位），提升輸入流程流暢度。
  - 將資料以客戶端排序：實作日期排序（預設由新到舊），確保以字串或日期正確比較。
  - 在列表上方加上「目前共有 X 筆珍奶價格紀錄」的統計標籤以顯示當前資料數量（含搜尋後結果）。

- [x] 刪除與錯誤處理
  - 在每筆資料加入刪除按鈕，刪除前跳出確認對話框：「確定要刪除這筆珍奶紀錄嗎？」
  - API 與前端對錯誤情境（缺少欄位、DB 錯誤）採用適當的 HTTP 狀態碼與錯誤訊息。

- [x] 文件化
  - 在 `openspec/openapi.yaml` 中建立完整的 OpenAPI 3.0 規格，包含 `GET /api/prices`（支援 `q`）、`POST /api/prices`、`DELETE /api/prices/{id}`，並加入範例回應與 request 範例，以便使用 Swagger UI 或其他工具檢視。

- [x] 測試與驗證（手動）
  - 對 API 使用 `curl` 或 Postman 做基本的新增、查詢、刪除操作驗證。
  - 使用 `node --check` 檢查前端 JS 語法以確認無語法錯誤。


## 關鍵技術決策（Technical Decision）
- [x] 移除價格排序功能以優化介面簡潔度
  - 原因：介面上保留多種排序（日期與價格）會增加使用者選擇成本，且專案以追蹤物價趨勢、觀察通膨為主要目標，日期排序能更清楚呈現時間序列走向；價格排序易造成資訊噪音，與主要使用情境不符。
  - 結果：移除與價格排序相關的 UI 元件（按鈕、樣式）與程式碼（排序處理函式），減少維護成本並簡化使用者介面。
  - 風險與備註：若未來有使用者需要基於價格的分析功能，可將價格排序或聚合分析作為進階或匯出功能（例如 CSV 匯出後以專用工具分析），以免影響主要介面簡潔性。


---

若你希望我把這份 `openspec/tasks.md` 加到變更紀錄（例如 `openspec/changes/<change-name>/tasks.md`）或把其中某些項目拆成更細的待辦工作（例如建立 CI 測試、加入驗證單元測試），我可以接著建立或更新對應的 artifacts。