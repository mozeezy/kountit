const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// This route is responsible for receiving input from the form component in front-end.
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
