const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/imageUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, location, description } =
    req.body;

  if (!name || !category || !quantity || !price || !location || !description) {
    res.status(400);
    throw new Error("Please fill in the required fields.");
  }

  let fileData = {};
  if (req.file) {
    let imageToUpload;
    try {
      imageToUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "Kountit",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded. Please try again.");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: imageToUpload.secure_url,
      fileMimeType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    location,
    description,
    image: fileData,
  });

  res.status(201).json(product);
});

module.exports = { createProduct };
