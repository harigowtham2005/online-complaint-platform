import Complaint from "../models/Complaint.js";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";

export const createComplaint = async (req, res) => {
  const { title, description } = req.body;
  try {
    const complaint = await Complaint.create({
      userId: req.user._id,
      title,
      description
    });
    res.status(201).json(complaint);
  } catch {
    res.status(500).json({ msg: "Failed to create complaint" });
  }
};

export const getUserComplaints = async (req, res) => {
  const complaints = await Complaint.find({ userId: req.user._id });
  res.json(complaints);
};

export const getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().populate("userId", "name email");
  res.json(complaints);
};

export const updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("userId");

    if (complaint) {
      await sendEmail({
        to: complaint.userId.email,
        subject: "Complaint Status Updated",
        text: `Your complaint "${complaint.title}" is now marked as ${status}.`
      });
    }

    res.json(complaint);
  } catch {
    res.status(500).json({ msg: "Failed to update complaint status" });
  }
};
