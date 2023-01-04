const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  checkLoginStatus,
  changePassword,
} = require("../controllers/userController");
const authorize = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", authorize, getUserInfo);
router.get("/loginstatus", checkLoginStatus);
router.patch("/changepassword", authorize, changePassword);

module.exports = router;
