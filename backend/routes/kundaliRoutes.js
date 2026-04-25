import express from "express";
import { generateKundali } from "../controllers/generateKundali.js";
import { healthCheck } from "../controllers/healthCheck.js";
import { test } from "../controllers/test.js";
import { sampleKundali } from "../controllers/sampleKundali.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { getMyKundalis, getKundaliById, deleteKundali, getAllKundalis } from "../controllers/kundaliController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/kundli", authenticateUser, generateKundali);
router.get("/health", healthCheck);
router.get("/test", test);
router.get("/sample", sampleKundali);

router.get("/kundali/my",     authenticateUser, getMyKundalis);
router.get("/kundali/:id",    authenticateUser, getKundaliById);
router.delete("/kundali/:id", authenticateUser, deleteKundali);
router.get("/admin/kundalis",        authenticateUser, authorizeRoles("SUPER_ADMIN"), getAllKundalis);

export default router;