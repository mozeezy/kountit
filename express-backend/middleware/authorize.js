const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const JsonWebToken = require("jsonwebtoken");

const authorize = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error(
        "You're not authorized to access this page. Please login to view the page."
      );
    }
    const verifyToken = JsonWebToken.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(verifyToken.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("This user does not exist.");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error(
      "You're not authorized to access this page. Please login to view the page."
    );
  }
});

module.exports = authorize;
