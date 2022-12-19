const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// This route is responsible for receiving input from the front-end.
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Validate that the user has filled in the fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in the missing fields");
  }

  // Validate that the password length is greater than 8 characters long
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must contain 8 characters");
  }



});

module.exports = router;
