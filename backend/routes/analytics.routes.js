import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const startDate = new Date();
    const endDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dilySalesData = await getDailySalesData(startDate, endDate);

    res.json({ analyticsData, dilySalesData });
  } catch (error) {
    console.error("Error in analytics route:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
