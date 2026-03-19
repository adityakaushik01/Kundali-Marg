import axios from "axios";

export const sendEmail = async (to, name, subject, content) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Kundali Marg - Astrology Insights",
          email: process.env.EMAIL_USER
        },
        to: [
          {
            email: to,
            name: name,
          }
        ],
        subject: subject,
        htmlContent: content,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return {
      success: true,
      message: `Email successfully sent to ${name || "User"} (${to})`,
      data: response.data
    };

  } catch (error) {
    console.error(
      "Brevo Email Error:",
      error.response?.data || error.message
    );

    throw new Error("Email sending failed");
  }
};