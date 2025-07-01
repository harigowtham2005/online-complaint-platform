import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("API working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
