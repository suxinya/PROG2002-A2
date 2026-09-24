// api-controller.js
const express = require('express');
const router = express.Router();
const db = require('./database');

//Get all activities
router.get('/events', async (req, res) => {
    try {
        const conn = await db.getConnection();
        const [rows] = await conn.query("SELECT * FROM events");
        await conn.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Get event details by ID
router.get('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const conn = await db.getConnection();
        const [rows] = await conn.query("SELECT * FROM events WHERE event_id = ?", [eventId]);
        await conn.end();
        if(rows.length === 0) return res.status(404).json({msg:"Event not found"});
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Filter events by category
router.get('/events/category/:catId', async (req, res) => {
    try {
        const catId = req.params.catId;
        const conn = await db.getConnection();
        const [rows] = await conn.query("SELECT * FROM events WHERE category_id = ?", [catId]);
        await conn.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Get all categories
router.get('/categories', async (req, res) => {
    try {
        const conn = await db.getConnection();
        const [rows] = await conn.query("SELECT * FROM categories");
        await conn.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Get organization information
router.get('/org', async (req, res) => {
    try {
        const conn = await db.getConnection();
        const [rows] = await conn.query("SELECT * FROM charity_orgs");
        await conn.end();
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
