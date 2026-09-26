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

app.listen(PORT, ()=>{
    console.log(`✅ Server running at http://localhost:${PORT}`);
})

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