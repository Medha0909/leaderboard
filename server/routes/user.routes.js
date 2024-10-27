const { claimPoints, getAllUser, getMonthlyData, getTodayHistory, getUserHistory, getUserWithHelpOfId, getUserWithHelpOfToken, getWeeklyData } = require ("../controllers/user.controller.js");
const verifyToken =require ("../middlewares/verifyToken.js");
const express = require("express");

const router = express.Router();

router.get("/get-users", getAllUser);
router.post("/get-users-info", verifyToken, getUserWithHelpOfToken);
router.post("/get-users-info", verifyToken, getUserWithHelpOfId);
router.patch("/claim-points", claimPoints);
router.get("/your-daily-history", getTodayHistory);
router.get("/your-weekly-history", getWeeklyData);
router.get("/your-monthly-history", getMonthlyData);
router.post("/your-history", getUserHistory);

module.exports=router;