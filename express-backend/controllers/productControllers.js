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

module.exports = { createProduct, getAllProducts };
