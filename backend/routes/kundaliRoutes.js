import express from "express";
import { generateKundali } from "../controllers/generateKundali.js";
import { healthCheck } from "../controllers/healthCheck.js";
import { test } from "../controllers/test.js";
import { sampleKundali } from "../controllers/sampleKundali.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { getMyKundalis, getKundaliById, deleteKundali } from "../controllers/kundaliController.js"; // ← ADD

const router = express.Router();

router.post("/kundli", authenticateUser, generateKundali);
router.get("/health", healthCheck);
router.get("/test", test);
router.get("/sample", sampleKundali);

// ← ADD these three
router.get("/kundali/my",     authenticateUser, getMyKundalis);
router.get("/kundali/:id",    authenticateUser, getKundaliById);
router.delete("/kundali/:id", authenticateUser, deleteKundali);

export default router;