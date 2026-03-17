import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  email_address: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  user_role: {
    type: String,
    enum: ["SUPER_ADMIN", "ASTROLOGER", "USER"],
    default: "USER"
  },

  is_approved: {
    type: Boolean,
    default: function () {
      return this.user_role === "USER";
    }
  },

  is_active: {
    type: Boolean,
    default: true
  },

  email_verified: {
    type: Boolean,
    default: false
  },

  email_otp: String,

  email_otp_expiry: Date,

  reset_token: String,

  reset_token_expiry: Date,

  kundali_created_count: {
    type: Number,
    default: 0
  },

  ai_question_count: {
    type: Number,
    default: 0
  },

  pdf_generated_count: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  collection: "user"
});

export default mongoose.model("User", userSchema);