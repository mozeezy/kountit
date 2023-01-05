const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter a name."],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      default: "SKU",
    },
    category: {
      type: String,
      required: [true, "Please enter a category for the product."],
      trim: true,
    },
    quantity: {
      type: String,
      required: [
        true,
        "Please enter the amount of this item you have in stock.",
      ],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please enter the price for this product."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please describe this product."],
      trim: true,
    },
    location: {
      type: String,
      required: [
        true,
        "Please enter the location of this item in your inventory.",
      ],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
