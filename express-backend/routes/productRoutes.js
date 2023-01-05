const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productControllers");
const authorize = require("../middleware/authMiddleware");

router.post("/", authorize, createProduct);
module.exports = router;
