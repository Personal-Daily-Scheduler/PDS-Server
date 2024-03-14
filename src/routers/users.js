const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:userId/diaries/plans", userController.getUserPlans);
router.post("/:userId/diaries/:date/plan", userController.saveUserPlan);
router.delete("/:userId/diaries/:date/plan", userController.deleteUserPlan);
router.put("/:userId/diaries/:date/plan", userController.updateUserPlan);

module.exports = router;
