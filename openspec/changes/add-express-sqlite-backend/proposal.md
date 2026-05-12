# 提案 (Proposal)

目標： 實作「珍奶價格觀察站」的 Express 後端與 SQLite 資料庫連接。

為何要做：
- 目前前端（`public/`）需要可用的 API 來儲存與查詢奶茶價格紀錄。
- 將 `server.js` 串接現有的 `database.js`（已建立 `milktea.db` 與 `prices` 表），提供穩定的後端 API。 

交付物：
- 更新後的 `server.js`（使用 `database.js`，提供 POST/GET `/api/prices`）
- 變更說明與實作任務清單
