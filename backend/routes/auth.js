import express from "express";

import {
  signup,
  login,
  createUserByAdmin,
  resetPassword,
  verifyEmailOtp,
  resendOtp
} from "../controllers/authController.js";

// NEW IMPORT
import { sendEmailController } from "../controllers/sendEmailController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmailOtp);
router.post("/admin/create-user", createUserByAdmin);
router.post("/reset-password/:token", resetPassword);
router.post("/resend-otp", resendOtp);

// EMAIL TEST ROUTE
router.post("/send-email", sendEmailController);

export default router;