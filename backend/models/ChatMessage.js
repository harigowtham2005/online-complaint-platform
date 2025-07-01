import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("ChatMessage", chatMessageSchema);
