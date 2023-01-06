const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productControllers");
const authorize = require("../middleware/authMiddleware");
const { upload } = require("../utils/imageUpload");

router.post("/", authorize, upload.single("image"), createProduct);
module.exports = router;
