# 設計 (Design)

概覽：
- 使用現有 `database.js`（開啟 `./milktea.db`，表 `prices(date, name, price)`）作為 SQLite 連線單一來源。
- 修改 `server.js` 改為引用 `database.js`，並新增兩個 REST API：
  - `POST /api/prices`：接收 JSON `{ date, name, price }`，寫入 `prices` 表。
  - `GET /api/prices`：回傳所有價格記錄，支援 query 參數 `q` 作為關鍵字（模糊比對 `name` 或 `date`）。

錯誤處理與回應格式：
- 成功建立：回傳 `201` 與 JSON `{ id, date, name, price }`。
- 取得資料成功：回傳 `200` 與 JSON 陣列 `[{ id, date, name, price }, ...]`。
- 參數或資料驗證失敗：回傳 `400` 與錯誤訊息。
- 資料庫錯誤：回傳 `500` 與錯誤訊息。

安全與注意事項：
- 使用參數化 SQL（`?`）避免 SQL 注入。
- `database.js` 已負責建立資料表；`server.js` 不再重複建立不同結構的表。
