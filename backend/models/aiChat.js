import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: { type: String, enum: ["user", "ai"], required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const aiChatSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    kundali_id: { type: mongoose.Schema.Types.ObjectId, ref: "Kundali", required: true },
    messages: [messageSchema],
}, { timestamps: true, collection: "ai_chat" }
);

export default mongoose.model("AiChat", aiChatSchema);