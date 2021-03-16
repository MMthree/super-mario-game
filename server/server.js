require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())

// Connect Database
connectDB();

app.use(express.json({extended: false}));


app.get('/', (req, res) => {
    res.status(200).json({ status: 200, msg: "Server running"});
});

// Routes
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`)
});