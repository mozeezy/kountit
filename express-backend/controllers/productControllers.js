const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/imageUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, location, description } =
    req.body;

  console.log(req.file);
  if (!name || !category || !quantity || !price || !location || !description) {
    res.status(400);
    throw new Error("Please fill in the required fields.");
  }

  // let fileData = {};
  // if (req.file) {
  //   let imageToUpload;
  //   try {
  //     imageToUpload = await cloudinary.uploader.upload(req.file.path, {
  //       folder: "Kountit",
  //       resource_type: "image",
  //     });
  //   } catch (error) {
  //     res.status(500);
  //     throw new Error("Image could not be uploaded. Please try again.");
  //   }

  // }

  // Since this controller function runs after
  let imageData = {};
  if (req.file) {
    imageData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
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
    image: imageData,
  });

  res.status(201).json(product);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json(products);
});

// Route to get a single product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const userProduct = product.user.toString();

  // req.user.id comes from the authorize function before reaching the controller function and this route.
  if (userProduct != req.user.id) {
    res.status(401);
    throw new Error("You're not authorize to view this page.");
  }

  if (!product) {
    res.status(400);
    throw new Error("This product does not exist.");
  }

  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const userProduct = product.user.toString();

  if (!product) {
    res.status(404);
    throw new Error("This product does not exist.");
  }

  if (userProduct != req.user.id) {
    res.status(401);
    throw new Error("You're not authorized to view this page.");
  }

  await product.remove();
  res.status(200).json({ message: "Product has been successfully removed" });
});

module.exports = { createProduct, getAllProducts, getProduct, deleteProduct };
