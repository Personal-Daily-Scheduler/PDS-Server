const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.registerUser);

module.exports = router;
