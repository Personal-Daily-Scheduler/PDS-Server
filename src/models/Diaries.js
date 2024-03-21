const mongoose = require("mongoose");

const UserDiarySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  diary: { type: Map, of: String, required: true },
  date: { type: String, required: true },
});

const UserDiary = mongoose.model("UserDiary", UserDiarySchema);

module.exports = UserDiary;
