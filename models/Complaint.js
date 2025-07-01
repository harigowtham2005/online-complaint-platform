import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  status: { type: String, enum: ["Pending", "Resolved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Complaint", complaintSchema);
