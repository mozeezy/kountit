// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Import Error Handler
const errorHandler = require("./middleware/errorHandler");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Initialize an express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Test the home route
app.get("/", (req, res) => {
  res.send("Hello I'm live from the home route!");
});

// Error Handler
app.use(errorHandler);

module.exports = app;
