const express = require("express");
const planController = require("../controllers/planController");
const scheduleController = require("../controllers/scheduleController");
const diaryController = require("../controllers/diaryController");

const router = express.Router();

router.get("/:userId/diaries/plans", planController.getUserPlans);
router.get("/:userId/diaries/schedules", scheduleController.getUserSchedules);
router.get("/:userId/diaries/diaries", diaryController.getUserDiaries);
router.post("/:userId/diaries/:date/plan", planController.saveUserPlan);
router.post(
  "/:userId/diaries/:date/schedule",
  scheduleController.saveUserSchedule,
);
router.post("/:userId/diaries/:date/diary", diaryController.saveUserDiary);
router.delete("/:userId/diaries/:date/plan", planController.deleteUserPlan);
router.delete(
  "/:userId/diaries/:date/schedule",
  scheduleController.deleteUserSchedule,
);
router.delete("/:userId/diaries/:date/diary", diaryController.deleteUserDiary);
router.put("/:userId/diaries/:date/plan", planController.updateUserPlan);
router.put(
  "/:userId/diaries/:date/schedule",
  scheduleController.updateUserSchedule,
);

module.exports = router;
