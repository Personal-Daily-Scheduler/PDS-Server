const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const CONFIG = require("../constants/config");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingCheck = await User.findOne({ email });

    if (existingCheck) {
      return res
        .status(409)
        .json({ result: false, message: "이미 사용 중인 아이디입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, CONFIG.BCRYPT_FACTOR);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ result: true, message: "회원가입에 성공했습니다." });
  } catch (error) {
    res.status(500).json({ result: false, error: "내부 서버 오류 발생" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({ email: userId });

    if (!user) {
      return res.status(401).json({
        result: false,
        message: "존재하지 않는 아이디거나 아이디가 일치하지 않습니다.",
      });
    }

    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr) {
        return res
          .status(500)
          .json({ result: false, message: "로그인 중 오류가 발생했습니다." });
      }

      if (isMatch) {
        const token = jwt.sign({ userId: user._id }, CONFIG.SECRET_KEY, {
          expiresIn: "1h",
        });

        return res
          .status(200)
          .json({ result: true, message: "로그인에 성공했습니다.", token });
      }
      return res
        .status(401)
        .json({ result: false, message: "비밀번호가 일치하지 않습니다." });
    });
  } catch (error) {
    res.status(500).json({ result: false, message: "내부 서버 오류" });
  }
};

const logoutUser = async (req, res) => {};

module.exports = { registerUser, loginUser, logoutUser };
