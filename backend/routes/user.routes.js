import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUser);

export default router;
