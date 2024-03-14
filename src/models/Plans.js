const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  planId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  selectedDate: { type: String },
  colorCode: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  completed: { type: Boolean, default: false },
});

const userPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  plans: [planSchema],
});

const UserPlan = mongoose.model("UserPlan", userPlanSchema);

module.exports = UserPlan;
