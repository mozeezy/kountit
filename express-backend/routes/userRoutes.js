const express = require("express");
const router = express.Router();

// This route is responsible for receiving input from the front-end.
router.post("/register", (req, res) => {
  // Edge-Case 1: IF the user doesn't provide an email
  if (!req.body.email) {
    res.status(400);
    throw new Error("Please enter a valid email address.");
  }
});

module.exports = router;
