import mongoose from "mongoose";

const kundaliSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  name: {
    type: String,
    required: true,
  },

  birth_details: {
    date: String,
    time: String,
    place: String,
    latitude: Number,
    longitude: Number,
    timezone: String,
  },

  kundali_data: {
    type: mongoose.Schema.Types.Mixed, // full swisseph response
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  dasha_timeline: { type: Array, default: [] }

}, {
  collection: "kundali"
});

export default mongoose.model("Kundali", kundaliSchema);