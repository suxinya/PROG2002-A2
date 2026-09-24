// database.js
const mysql = require('mysql2/promise');
const dbConfig = require('./db-details');

async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("✅ Database connected successfully");
        return connection;
    } catch (err) {
        console.error("❌ Database connection failed: ", err);
        throw err;
    }
}

module.exports = { getConnection };