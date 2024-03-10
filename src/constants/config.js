require("dotenv").config();

const CONFIG = {
  MONGODB_ENDPOINT: process.env.MONGODB_ENDPOINT,
};

module.exports = CONFIG;
