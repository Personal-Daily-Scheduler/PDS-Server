const mongoose = require("mongoose");

const CONFIG = require("../constants/config");

async function mongooseLoader() {
  try {
    await mongoose.connect(CONFIG.MONGODB_ENDPOINT);

    mongoose.connection.once("connected", () => {
      console.log("DB Connected");
    });
    mongoose.connection.on("error", () => {
      console.log("DB Connected Error");
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = mongooseLoader;
