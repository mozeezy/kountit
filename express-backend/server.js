const express = require("express");
const mongoose = require("mongoose");

const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

// Connect to MongoDB Database
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
