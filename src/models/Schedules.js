const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  scheduleId: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String },
  selectedDate: { type: String },
  colorCode: { type: String },
  startTime: { type: String },
  isSynced: { type: Boolean, default: false },
  endTime: { type: String },
});

const UserScheduleSchema = new mongoose.Schema({
  userId: { type: String },
  date: { type: String, required: true },
  schedules: [ScheduleSchema],
});

const UserSchedule = mongoose.model("UserSchedule", UserScheduleSchema);

module.exports = UserSchedule;
