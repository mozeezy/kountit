const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProductInfo,
} = require("../controllers/productControllers");
const authorize = require("../middleware/authorize");
const { upload } = require("../utils/imageUpload");

// The upload.single("image") passes the object from the imageUpload.js. It can be accessed via the req.file in the createProduct controller function
router.post("/", authorize, upload.single("image"), createProduct);

// Rest of routes
router.get("/all-products", authorize, getAllProducts);
router.get("/:id", authorize, getProduct);
router.delete("/:id", authorize, deleteProduct);
router.patch("/:id", authorize, upload.single("image"), updateProductInfo);
module.exports = router;
