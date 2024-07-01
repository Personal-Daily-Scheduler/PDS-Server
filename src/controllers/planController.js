const UserPlan = require("../models/Plans");

const logMemoryUsage = require("../utils/logMemoryUsage");

const getUserPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    logMemoryUsage("Get Plans - Start");

    const userPlans = await UserPlan.find({ userId });

    res.json(userPlans);
    
    logMemoryUsage("Get Plans - End");
  } catch (error) {
    console.error(error);

    res.status(500).json({ result: false, message: "Internal Server Error" });
  }
};

const saveUserPlan = async (req, res) => {
  const { userId, date } = req.params;
  const planObject = req.body;

  try {
    const userPlan = await UserPlan.findOneAndUpdate(
      { userId, date },
      { $push: { plans: planObject } },
      { upsert: true, new: true },
    );

    res.json({
      result: true,
      message: "계획이 성공적으로 저장되었습니다.",
      data: userPlan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ result: false, message: error.message });
  }
};

const deleteUserPlan = async (req, res) => {
  const { userId, date } = req.params;
  const planIdObject = req.body;

  try {
    const userPlan = await UserPlan.findOneAndUpdate(
      { userId, date },
      { $pull: { plans: planIdObject } },
      { new: true },
    );

    if (userPlan.plans.length === 0) {
      await UserPlan.deleteOne({ userId, date });
    }

    res.json({
      result: true,
      message: "계획이 성공적으로 삭제되었습니다.",
      data: userPlan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ result: false, message: error.message });
  }
};

const updateUserPlan = async (req, res) => {
  const { userId, date } = req.params;
  const updatedPlan = req.body;

  try {
    const userPlan = await UserPlan.findOneAndUpdate(
      { userId, date, "plans.planId": updatedPlan.planId },
      { $set: { "plans.$": updatedPlan } },
      { new: true },
    );

    res.json({
      result: true,
      message: "일정이 성공적으로 업데이트 되었습니다.",
      data: userPlan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ result: false, message: error.message });
  }
};

module.exports = { saveUserPlan, getUserPlans, deleteUserPlan, updateUserPlan };
