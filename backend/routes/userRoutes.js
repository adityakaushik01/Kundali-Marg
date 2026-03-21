import express              from "express";
import { getMe }            from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
 
const router = express.Router();
 
// GET /api/user/me
router.get("/me", authenticateUser, getMe);
 
export default router;