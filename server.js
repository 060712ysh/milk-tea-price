const express = require("express");
const cors = require("cors");
const db = require("./database.js");

const app = express();
const PORT = 3000;

// 中介軟體
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 測試 API
app.get("/api/test", (req, res) => {
    res.json({ message: "API 正常運作" });
});

// POST /api/prices - create a new price record
app.post('/api/prices', (req, res) => {
    const { date, name, price } = req.body || {};
    if (!date || !name || price === undefined || price === null) {
        return res.status(400).json({ error: 'Missing required fields: date, name, price' });
    }
    const insert = `INSERT INTO prices (date, name, price) VALUES (?, ?, ?)`;
    db.run(insert, [date, name, price], function(err) {
        if (err) {
            console.error('DB insert error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        const created = { id: this.lastID, date, name, price };
        res.status(201).json(created);
    });
});

// GET /api/prices - list price records, optional ?q=keyword filters name or date
app.get('/api/prices', (req, res) => {
    const q = req.query.q;
    let sql = 'SELECT id, date, name, price FROM prices';
    const params = [];
    if (q) {
        sql += ' WHERE name LIKE ? OR date LIKE ?';
        params.push(`%${q}%`, `%${q}%`);
    }
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('DB query error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// DELETE /api/prices/:id - delete a price record by id
app.delete('/api/prices/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM prices WHERE id = ?', [id], function (err) {
        if (err) {
            console.error('DB delete error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (this.changes === 0) {
            return res.status(500).json({ error: 'Delete failed' });
        }

        res.json({ message: '刪除成功' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});