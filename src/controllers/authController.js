const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const CONFIG = require("../constants/config");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingCheck = await User.findOne({ email });

    if (existingCheck) {
      return res.status(409).json({
        result: false,
        message: "이미 사용 중인 아이디입니다.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, CONFIG.BCRYPT_FACTOR);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ result: true, message: "회원가입에 성공했습니다." });
  } catch (error) {
    res.status(500).json({ result: false, error: "내부 서버 오류 발생" });
  }
};

module.exports = { registerUser };
