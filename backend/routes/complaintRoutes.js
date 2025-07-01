import express from "express";
import {
  createComplaint,
  getUserComplaints,
  getAllComplaints,
  updateComplaintStatus
} from "../controllers/complaintController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createComplaint);
router.get("/mine", authMiddleware, getUserComplaints);
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllComplaints);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateComplaintStatus);

export default router;
