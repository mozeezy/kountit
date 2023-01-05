const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, location, description } =
    req.body;

  if (!name || !category || !quantity || !price || !location || !description) {
    res.status(400);
    throw new Error("Please fill in the required fields.");
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
  });

  res.status(201).json(product);
});

module.exports = { createProduct };
