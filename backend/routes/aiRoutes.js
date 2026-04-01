import express from "express";
import { askAI, getChatHistory } from "../controllers/aiController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", authenticateUser, askAI);
router.get("/history/:kundali_id", authenticateUser, getChatHistory);

export default router;