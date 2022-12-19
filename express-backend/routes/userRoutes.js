const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// This route is responsible for receiving input from the form component in front-end.
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validate that the user has not left any fields empty.
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in the missing fields");
    }

    // Validate that the password length is at least 8 characters long
    if (password.length < 8) {
      res.status(400);
      throw new Error("Password must contain 8 characters");
    }

    // Find user in mongoDB database by email.
    const userInDatabase = await User.findOne({ email });

    // If the user exists in the database, throw an error
    if (userInDatabase) {
      res.status(400);
      throw new Error(
        "A user with that email already exists. Please use a different email address"
      );
    }

    // Hashing the password BEFORE storing it in the Database.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user using the User model we created and the data we get from the req.body object.
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // If the user exists then respond with the JSON format confirming that the user has been created.
    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid request.");
    }
  })
);

module.exports = router;
