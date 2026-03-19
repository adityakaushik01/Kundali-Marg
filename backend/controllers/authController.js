import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { logger } from "../utils/logger.js";
import { sendOTP } from "../services/otpService.js";

// Signup
export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email_address, password } = req.body;

    logger.info("Signup attempt", { email_address });

    const existingUser = await User.findOne({ email_address });

    if (existingUser) {
      if (!existingUser.email_verified) {
        try {
          await sendOTP(existingUser);
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }

        logger.info("OTP resent", { email_address });

        return res.json({
          message: "OTP resent. Please verify your email."
        });
      }

      logger.warn("Signup failed - email exists", { email_address });

      return res.status(400).json({
        message: "Email already registered"
      });
    }

    console.log("user enter password", password);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user first
    const user = await User.create({
      first_name,
      last_name,
      email_address,
      password: hashedPassword
    });

    logger.info("User created", {
      user_id: user._id,
      email_address
    });

    // Send OTP after — if fails, user stays in DB (unverified, handled on next signup attempt)
    try {
      await sendOTP(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    logger.info("OTP sent", { email_address });

    res.json({
      message: "Signup successful. Please verify your email."
    });

  } catch (error) {
    logger.error("Signup error", { error: error.message });

    res.status(500).json({
      message: "Signup failed"
    });
  }
};


// Login
export const login = async (req, res) => {
  try {
    const { email_address, password } = req.body;

    logger.info("Login attempt", { email_address });

    const user = await User.findOne({ email_address });

    if (!user) {
      logger.warn("Login failed - user not found", { email_address });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      logger.warn("Login failed - wrong password", { email_address });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.email_verified) {
      try {
        await sendOTP(user);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }

      logger.info("OTP resent on login", { email_address });

      return res.status(400).json({
        message: "Email not verified. OTP sent again.",
        email_address: user.email_address
      });
    }

    const token = jwt.sign(
      { user_id: user._id, user_role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    logger.info("Login successful", {
      user_id: user._id,
      role: user.user_role
    });

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    logger.error("Login error", { error: error.message });

    res.status(500).json({
      message: "Login failed"
    });
  }
};


// Admin Create User
export const createUserByAdmin = async (req, res) => {
  try {
    const { first_name, last_name, email_address, user_role } = req.body;

    const existing = await User.findOne({ email_address });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const tempPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.create({
      first_name,
      last_name,
      email_address,
      password: hashedPassword,
      user_role,
      reset_token: hashedToken,
      reset_token_expiry: Date.now() + 3600000,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email_address,
      "Your Kundali Marg account has been created",
      `
      <h2>Welcome to Kundali Marg</h2>
      <p>Your account has been created by admin.</p>
      <p>Please click below to set your password:</p>
      <a href="${resetLink}">Reset Password</a>
      `
    );

    res.json({
      message: "User created and email sent",
    });
  } catch (error) {
    logger.error("Admin create user error", { error: error.message });

    res.status(500).json({
      message: "User creation failed",
    });
  }
};


// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      reset_token: hashedToken,
      reset_token_expiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.reset_token = null;
    user.reset_token_expiry = null;

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    logger.error("Reset password error", { error: error.message });

    res.status(500).json({
      message: "Reset failed",
    });
  }
};


// Verify Email OTP
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email_address, otp } = req.body;

    logger.info("OTP verification attempt", { email_address });

    const user = await User.findOne({ email_address });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.email_verified) {
      return res.status(400).json({ message: "Email already verified. Please login." });
    }

    if (user.email_otp_expiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Plain text compare since OTP is stored as plain text
    if (user.email_otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.email_verified = true;
    user.email_otp = null;
    user.email_otp_expiry = null;

    await user.save();

    logger.info("Email verified", { email_address });

    const token = jwt.sign(
      { user_id: user._id, user_role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Email verified successfully",
      token
    });

  } catch (error) {
    logger.error("OTP verification error", { error: error.message });

    res.status(500).json({ message: "Verification failed" });
  }
};