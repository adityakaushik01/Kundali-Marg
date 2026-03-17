import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

// Signup

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email_address } = req.body;

    const existingUser = await User.findOne({ email_address });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const password = `${first_name}@123`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email_address,
      password: hashedPassword,
    });

    console.log("User Created", user);

    const token = jwt.sign(
      { user_id: user._id, user_role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Signup successful",
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Signup failed",
    });
  }
};





// Login
export const login = async (req, res) => {

  try {
    const { email_address, password } = req.body;

    const user = await User.findOne({ email_address });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user_id: user._id, user_role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
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

    const user = await User.create({
      first_name,
      last_name,
      email_address,
      password: hashedPassword,
      user_role,
      reset_token: resetToken,
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
      `,
    );

    res.json({
      message: "User created and email sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "User creation failed",
    });
  }
};


// Reset Password

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findOne({
      reset_token: req.params.token,
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
    res.status(500).json({
      message: "Reset failed",
    });
  }
};

export const sendEmailController = async (req, res) => {
  try {
    const { to, subject, content } = req.body;

    if (!to || !subject || !content) {
      return res.status(400).json({
        message: "to, subject and content are required",
      });
    }

    await sendEmail(to, subject, content);

    res.json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Email sending failed",
    });
  }
};