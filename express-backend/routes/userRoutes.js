const express = require("express");
const router = express.Router();


// This route is responsible for receiving input from the front-end.
router.post("/register", (req, res) => {
  res.send("Successful!")
})

module.exports = router