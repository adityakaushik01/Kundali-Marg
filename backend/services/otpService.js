import crypto from "crypto";
import { generateOTP, getOTPExpiry, getOTPEmailTemplate } from "../utils/otpUtils.js";
import { sendEmail } from "../utils/sendEmail.js";

const OTP_COOLDOWN = 30 * 1000; // 30 seconds

export const sendOTP = async (user) => {
  // 1. Cooldown check
  if (user.last_otp_sent && Date.now() - user.last_otp_sent < OTP_COOLDOWN) {
    throw new Error("Please wait before requesting OTP again");
  }

  // 2. Generate OTP
  const otp = generateOTP();

  // 3. Prepare fields but don't save yet
  user.email_otp = otp;
  user.email_otp_expiry = getOTPExpiry();
  user.last_otp_sent = Date.now();

  // 4. Send email first
  await sendEmail(
    user.email_address,
    `${user.first_name} ${user.last_name}`,
    `${otp} - Your verification code for Kundali Marg`,
    getOTPEmailTemplate(user.first_name, otp)
  );

  // 5. Only save to DB after email sends successfully
  await user.save();
};