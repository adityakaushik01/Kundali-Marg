import express from "express";

import {
  signup,
  login,
  createUserByAdmin,
  resetPassword,
  sendEmailController
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/admin/create-user", createUserByAdmin);
router.post("/reset-password/:token", resetPassword);
router.post("/send-email", sendEmailController);

export default router;