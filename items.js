const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Server-side validation
function validateInput(data) {
    if (!data.title || !data.description || !data.category ||
        !data.location || !data.date || !data.contact) {
        return false;
    }
    return true;
}

// CREATE
router.post('/', (req, res) => {
    const data = req.body;

    if (!validateInput(data)) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const sql = `
        INSERT INTO items 
        (title, description, category, location, date, contact)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, 
        [data.title, data.description, data.category,
         data.location, data.date, data.contact],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Item added successfully" });
        });
});

// READ ALL
router.get('/', (req, res) => {
    db.query("SELECT * FROM items", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// READ ONE
router.get('/:id', (req, res) => {
    db.query("SELECT * FROM items WHERE id = ?", 
    [req.params.id], 
    (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});

// UPDATE STATUS
router.put('/:id', (req, res) => {
    const { status } = req.body;

    db.query("UPDATE items SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status updated" });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    db.query("DELETE FROM items WHERE id = ?",
    [req.params.id],
    (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item deleted" });
    });
});

module.exports = router;