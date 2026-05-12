const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = path.join(__dirname, 'milktea.db');

// 建立或開啟資料庫檔案 (milktea.db)
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error('資料庫連線失敗:', err.message);
    } else {
        console.log(`已成功連線至 SQLite 資料庫: ${DB_FILE}`);
    }
});

// 建立資料表：包含日期 (date)、商品名稱 (name)、價格 (price)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            name TEXT,
            price INTEGER
        )
    `, (err) => {
        if (err) {
            console.error("建立資料表失敗:", err.message);
        } else {
            console.log("資料表 'prices' 已就緒");
        }
    });
});

module.exports = db;