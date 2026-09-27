// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const apiRoutes = require('./api-controller');

// ========== Add database connection pool db ==========
const db = mysql.createPool({
host: 'localhost',
user: 'root',
password: '573635971Sxy',
database: 'charityevents_db',
waitForConnections: true,
connectionLimit: 10
});
// =======================================

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.use(cors());
app.use('/api', apiRoutes);

//Get single event details interface
app.get('/api/events/:id', async (req, res) => {
  const eventId = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
    if(rows.length === 0){
      return res.status(404).json({message:"Event not found"});
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({message:"Query failed", error:err});
  }
})


//Add activity submission interface
app.post('/api/events', async (req, res) => {
  const {event_name, description, location, event_date, category_id, org_id, status} = req.body;
  console.log("Received data submitted by the front-end:", req.body);
  try{
    const dateStr = event_date.replaceAll("/","-");
    const fullDateTime = dateStr + " 00:00:00";
    const sql = `INSERT INTO events(event_name,description,location,event_date,category_id,org_id,status,ticket_price,fundraising_goal,amount_raised,image_url) 
    VALUES (?,?,?,?,?,?,?,DEFAULT,DEFAULT,DEFAULT,DEFAULT)`
    const [result] = await db.query(sql,[
        event_name,
        description,
        location,
        fullDateTime,
        category_id,
        org_id,
        status
    ])
    res.json({success:true, newEventId: result.insertId})
  }catch(err){
    console.log("====MySQL Error Details====" ,err);
    res.status(500).json({message:"Addition failed"})
  }
})

// Delete activity interface
app.delete('/api/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const [result] = await db.query('DELETE FROM events WHERE event_id = ?', [eventId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({message: "Event not found"});
    }
    res.json({success:true, message:"Event deleted successfully"});
  } catch(err) {
    console.log(err);
    res.status(500).json({message:"Delete failed", error:err});
  }
})

// Get a complete list of categories for the search page dropdown menu
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT category_id, category_name FROM categories');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Fetch categories failed"});
  }
});

//Multi condition combination filtering interface: location, date, category ID
app.get('/api/events/filter', async (req, res) => {
  try {
    const { location, event_date, category_id } = req.query;
    let sql = "SELECT * FROM events WHERE 1=1 ";
    let params = [];

    if(location && location.trim() !== ""){
      sql += " AND location LIKE ? ";
      params.push(`%${location.trim()}%`);
    }
    if(event_date && event_date.trim() !== ""){
      sql += " AND DATE(event_date) = ? ";
      params.push(event_date);
    }
    if(category_id && category_id !== ""){
      sql += " AND category_id = ? ";
      params.push(category_id);
    }

    const [results] = await db.query(sql, params);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Filter query error"});
  }
});


app.listen(PORT, ()=>{
    console.log(`✅ Server running at http://localhost:${PORT}`);
})