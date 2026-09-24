// server.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api-controller');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, ()=>{
    console.log(`✅ Server running at http://localhost:${PORT}`);
});