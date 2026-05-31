import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// ── Secret key guard ──────────────────────────────────────────────────────

router.post("/create-admin", async (req, res) => {
  try {
const ADMIN_SECRET = process.env.ADMIN_CREATION_SECRET;
    console.log("received secret:", req.headers["x-admin-secret"]);
console.log("env secret:", process.env.ADMIN_CREATION_SECRET);
    // Check secret key from header
    const secret = req.headers["x-admin-secret"];
    if (!secret || secret !== ADMIN_SECRET) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { first_name, last_name, email_address, password } = req.body;

    if (!first_name || !last_name || !email_address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email_address });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email_address,
      password: hashed,
      user_role: "SUPER_ADMIN",
      email_verified: true,
      is_active: true,
      is_approved: true,
      is_premium: true
    });

    res.status(201).json({ message: "Super admin created", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;