const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const JsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return JsonWebToken.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

// Register User Controller Function
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate that the user has not left any fields empty.
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in the missing fields.");
  }

  // Validate that the password length is at least 8 characters long
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must contain 8 characters.");
  }

  // Find user in mongoDB database by email.
  const userInDatabase = await User.findOne({ email });

  // If the user exists in the database, throw an error
  if (userInDatabase) {
    res.status(400);
    throw new Error(
      "A user with that email already exists. Please use a different email address."
    );
  }

  // Create a new user using the User model we created and the data we get from the req.body object.
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate JWT

  const token = generateToken(user._id);

  // Send a cookie with the token to the frontend
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  // If the user exists then respond with the JSON format confirming that the user has been created. This data is sent to the frontend.
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid request.");
  }
});

// Login User Function

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate that the email/password fields are filled

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in the missing fields.");
  }

  // Check if the user exists in the database

  const isUserInDatabase = await User.findOne({ email });

  if (!isUserInDatabase) {
    res.status(400);
    throw new Error("This user does not exist. Please sign up.");
  }

  // Check that the email entered matches the password for that user

  const checkPassword = await bcrypt.compare(
    password,
    isUserInDatabase.password
  );

  const token = generateToken(isUserInDatabase._id);

  if (checkPassword) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
  }

  if (isUserInDatabase && checkPassword) {
    res.status(200).json({
      _id: isUserInDatabase.id,
      name: isUserInDatabase.name,
      email: isUserInDatabase.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email/password.");
  }
});

// Logout user function
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logout Successful." });
});

// Get user info to create a profile. This function provides data ONLY if the user is logged in (i.e. a cookie exists)
const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User does not exist.");
  }
});

// Checks whether the user is logged in or not and returns a boolean. This will be very important when it comes to conditional rendering in the frontend by having certain components be visible depending on the boolean evaluation (i.e show a login button when the user is logged out or a logout button when the user is logged in)
const checkLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  const verifyToken = JsonWebToken.verify(token, process.env.JWT_SECRET_KEY);

  if (verifyToken) {
    return res.json(true);
  }
  return res.json(false);
});

// This controller function handles password change
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, newPassword } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User does not exist.");
  }

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Please fill in the required fields.");
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

  if (user && isPasswordMatch) {
    user.password = newPassword;
    await user.save();
    res.status(200).send("Your password has been changed successfully.");
  } else {
    res.status(400);
    throw new Error("Your old password is incorrect.");
  }
});

// Forgot password route
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist.");
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await Token.deleteOne();
  }

  // Create Reset token
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  // Hash the token before we save it to our database so that we don't have malicious users use the token to reset password
  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save the reset token to the database
  const newToken = await Token.create({
    userId: user._id,
    token: hashToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 60 * 1000,
  });

  const resetURL = `${process.env.URL_BASE}/resetpassword/${resetToken}`;

  // Getting the first name from the full name string
  const fullName = user.name.split(" ");

  // Creating the email that we're going to sent to the user.

  const subject = "Password Reset Request";
  const sendTo = user.email;
  const sentFrom = process.env.EMAIL_USERNAME;
  const name = fullName[0];
  const newURL = resetURL;

  try {
    await sendEmail(subject, name, sendTo, sentFrom, newURL);
    res.status(200).json({
      success: true,
      message: "Your request to reset your password has been sent.",
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email has not been sent. Please try again.");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  res.send("Hello");
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  checkLoginStatus,
  changePassword,
  forgotPassword,
  resetPassword,
};
