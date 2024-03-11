require("dotenv").config();

const CONFIG = {
  MONGODB_ENDPOINT: process.env.MONGODB_ENDPOINT,
  BCRYPT_FACTOR: Number(process.env.BCRYPT_COST_FACTOR),
  SECRET_KEY: process.env.JWT_SECRET_KEY,
};

module.exports = CONFIG;
