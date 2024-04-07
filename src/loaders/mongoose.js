const mongoose = require("mongoose");

const CONFIG = require("../constants/config");

const mongooseLoader = async () => {
  try {
    console.log("mongodb loader", CONFIG.MONGODB_ENDPOINT);
    
    await mongoose.connect(CONFIG.MONGODB_ENDPOINT);
  } catch (error) {
    console.error(error);
  }
}

module.exports = mongooseLoader;
