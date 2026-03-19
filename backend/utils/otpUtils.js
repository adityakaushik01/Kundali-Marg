import crypto from "crypto";

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const getOTPExpiry = () => {
  return Date.now() + 10 * 60 * 1000;
};

export const getOTPEmailTemplate = (firstName, otp) => {
  return `
    <div style="max-width:480px;margin:0 auto;font-family:sans-serif;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

      <div style="background:#1a1a2e;padding:24px 32px;text-align:center;">
        <p style="color:#ffffff;font-size:18px;font-weight:500;margin:0;letter-spacing:0.5px;">Kundali Marg</p>
      </div>

      <div style="padding:32px 32px 16px;">
        <p style="font-size:15px;color:#6b7280;margin:0 0 8px;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#111827;margin:0 0 24px;line-height:1.6;">
          Use the verification code below to confirm your email address. This code is valid for <strong>10 minutes</strong>.
        </p>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
          <p style="font-size:13px;color:#6b7280;margin:0 0 12px;letter-spacing:0.5px;text-transform:uppercase;">Your verification code</p>
          <p style="font-size:36px;font-weight:500;letter-spacing:12px;color:#111827;margin:0;font-family:monospace;">${otp}</p>
        </div>

        <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:0;">
          If you did not request this, you can safely ignore this email. Do not share this code with anyone.
        </p>
      </div>

      <div style="border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;">
        <p style="font-size:12px;color:#9ca3af;margin:0;">© 2025 Kundali Marg. All rights reserved.</p>
      </div>

    </div>
  `;
};