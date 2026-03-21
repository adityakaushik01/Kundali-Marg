import User from "../models/User.js";
 
export const getMe = async (req, res) => {
  try {
    // req.user comes from authMiddleware (decoded JWT)
    const user = await User.findById(req.user.user_id).select(
      "first_name last_name email_address user_role kundali_created_count ai_question_count pdf_generated_count createdAt is_active"
    );
 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    res.json({
      user_id:               user._id,
      first_name:            user.first_name,
      last_name:             user.last_name,
      email_address:         user.email_address,
      user_role:             user.user_role,
      kundali_created_count: user.kundali_created_count,
      ai_question_count:     user.ai_question_count,
      pdf_generated_count:   user.pdf_generated_count,
      member_since:          user.createdAt,
      is_active:             user.is_active,
    });
 
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
};