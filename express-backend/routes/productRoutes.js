const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productControllers");
const authorize = require("../middleware/authMiddleware");
const { upload } = require("../utils/imageUpload");

// The upload.single("image") passes the object from the imageUpload.js. It can be accessed via the req.file in the createProduct controller function
router.post("/", authorize, upload.single("image"), createProduct);
module.exports = router;
