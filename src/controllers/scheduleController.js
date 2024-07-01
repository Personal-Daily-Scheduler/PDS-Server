const UserSchedule = require("../models/Schedules");

const logMemoryUsage = require("../utils/logMemoryUsage");

const getUserSchedules = async (req, res) => {
  const { userId } = req.params;

  try {
    logMemoryUsage("Get Schedules - Start");

    const userSchedule = await UserSchedule.find({ userId });

    res.json({
      result: true,
      message: "특정 회원의 스케쥴 조회에 성공했습니다.",
      data: userSchedule,
    });
    
    logMemoryUsage("Get Schedules - End");
  } catch (error) {
    console.error("Error fetching user schedules:", error);

    res
      .status(500)
      .json({ result: false, message: "Failed to fetch user schedules" });
  }
};

const saveUserSchedule = async (req, res) => {
  const { userId, date } = req.params;
  const schedules = req.body;

  try {
    const result = await UserSchedule.findOneAndUpdate(
      { userId, date },
      { $push: { schedules } },
      { upsert: true, new: true },
    );

    res
      .status(200)
      .json({ message: "Schedule updated successfully", data: result });
  } catch (error) {
    console.error("Error saving schedule:", error);

    res.status(500).json({ error: "Failed to save schedule" });
  }
};

const deleteUserSchedule = async (req, res) => {
  const { userId, date } = req.params;
  const scheduleIdObject = req.body;

  try {
    const userSchedule = await UserSchedule.findOneAndUpdate(
      { userId, date },
      { $pull: { schedules: scheduleIdObject } },
      { new: true },
    );

    if (userSchedule.schedules.length === 0) {
      await UserSchedule.deleteOne({ userId, date });
    }

    res.json({
      result: true,
      message: "스케줄이 성공적으로 삭제되었습니다.",
      data: userSchedule,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ result: false, message: error.message });
  }
};

const updateUserSchedule = async (req, res) => {
  const { userId, date } = req.params;
  const updatedSchedule = req.body;

  try {
    const userSchedule = await UserSchedule.findOneAndUpdate(
      { userId, date, "schedules.scheduleId": updatedSchedule.scheduleId },
      { $set: { "schedules.$": updatedSchedule } },
      { new: true },
    );

    res.json({
      result: true,
      message: "일정이 성공적으로 업데이트되었습니다.",
      data: userSchedule,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ result: false, message: error.message });
  }
};

module.exports = {
  getUserSchedules,
  saveUserSchedule,
  deleteUserSchedule,
  updateUserSchedule,
};
