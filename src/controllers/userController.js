const createHttpError = require("http-errors");
const User = require("../models/Users");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "회원가입에 성공했습니다." });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "내부 서버 오류 발생" });
  }
};

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

module.exports = { registerUser, loginUser, logoutUser };
