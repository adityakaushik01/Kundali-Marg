import express from "express";
import User from "../models/User.js";
import Kundali from "../models/Kundali.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

const guard = [authenticateUser, authorizeRoles("SUPER_ADMIN")];

router.get("/stats", ...guard, async (req, res) => {
  try {
    const [total_users, total_kundalis, aiAgg, pdfAgg] = await Promise.all([
      User.countDocuments(),
      Kundali.countDocuments(),
      User.aggregate([{ $group: { _id: null, total: { $sum: "$ai_question_count" } } }]),
      User.aggregate([{ $group: { _id: null, total: { $sum: "$pdf_generated_count" } } }]),
    ]);
    res.json({
      total_users,
      total_kundalis,
      total_ai_questions: aiAgg[0]?.total ?? 0,
      total_pdfs: pdfAgg[0]?.total ?? 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users", ...guard, async (req, res) => {
  try {
    const users = await User.find({ user_role: { $ne: "SUPER_ADMIN" } })
      .select("-password -email_otp -email_otp_expiry -reset_token -reset_token_expiry")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/users/:id", ...guard, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Kundali.deleteMany({ user_id: req.params.id });
    res.json({ message: "User and their kundalis deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/kundalis", ...guard, async (req, res) => {
  try {
    const kundalis = await Kundali.find({})
      .select("name birth_details createdAt user_id")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ kundalis });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users/:id/kundalis", ...guard, async (req, res) => {
  try {
    const [user, kundalis] = await Promise.all([
      User.findById(req.params.id)
        .select("-password -email_otp -email_otp_expiry -reset_token -reset_token_expiry")
        .lean(),
      Kundali.find({ user_id: req.params.id })
        .sort({ createdAt: -1 })
        .lean(),
    ]);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user, kundalis });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;