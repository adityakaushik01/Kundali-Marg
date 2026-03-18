import { sendEmail } from "../utils/sendEmail.js";

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