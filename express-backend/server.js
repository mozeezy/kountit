// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config()

// Initialize an express app
const app = express()
const PORT = process.env.PORT || 3000


app.get("/", (req, res) => {
  res.send("Hello I'm Live from my app!")
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})