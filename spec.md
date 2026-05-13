# 專案技術規格表

| 類別 | 技術名稱/工具 | 用途與規格說明 |
|---|---|---|
| 開發環境 | Node.js + npm | 作為後端執行環境與套件管理工具，負責啟動 Express 伺服器與安裝依賴套件。 |
| 前端 | Vanilla HTML/CSS/JavaScript | 專案前端採用原生 HTML/CSS/JS，不依賴 React、Vue、Angular 等框架。畫面與互動皆由原生 DOM 與 fetch API 實作。 |
| 前端頁面 | `public/index.html` | 提供資料輸入表單、搜尋欄位、資料表格與刪除操作介面。 |
| 前端互動 | `public/script.js` | 負責表單驗證、資料送出、列表載入、刪除資料與搜尋即時更新等互動邏輯。 |
| 前端功能 | 日期自動跳轉（Auto-focus） | 日期欄位拆成 `YYYY / MM / DD` 三段輸入，輸入滿位後自動跳到下一欄，提升輸入效率。 |
| 前端功能 | 日期排序（Date Sorting） | 列表資料會依日期排序，預設為由新到舊排序，並可在前端依資料內容進行排序處理。 |
| 前端功能 | 即時搜尋 | 透過搜尋欄位輸入關鍵字後，前端會呼叫 API 重新載入資料，達成即時篩選效果。 |
| 後端 | Express.js | 建立 RESTful API 與靜態檔案服務，負責處理前端請求與資料庫存取。 |
| 後端中間件 | `cors` | 啟用跨來源資源共享，讓前端可順利呼叫 API。 |
| 後端中間件 | JSON body 解析（`express.json()`） | 處理請求中的 JSON 格式資料；功能上對應常見的 body parser 用途。 |
| 資料庫 | SQLite | 使用檔案型資料庫 `milktea.db`，適合輕量、單機式資料保存與查詢。 |
| 資料表 | `prices` | 儲存珍奶價格紀錄，欄位包含 `id`、`date`、`name`、`price`。 |
| 資料庫初始化 | `database.js` | 啟動時自動建立或開啟 SQLite 資料庫，並確保 `prices` 資料表存在。 |
| API 設計 | GET `/api/prices` | 取得所有價格資料，支援 `?q=` 關鍵字查詢，可依商品名稱或日期過濾。 |
| API 設計 | POST `/api/prices` | 新增一筆價格資料，需帶入 `date`、`name`、`price`。 |
| API 設計 | DELETE `/api/prices/:id` | 依資料 `id` 刪除指定紀錄。 |
| API 設計 | RESTful 架構 | 以資源導向方式設計 CRUD 介面，目前已實作 GET、POST、DELETE 三種操作。 |
