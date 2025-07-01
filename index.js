import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://harigowtham2005.github.io",
    methods: ["GET", "POST"],
    credentials: true
  }
});


// Middlewares
app.use(cors({
  origin: "https://harigowtham2005.github.io", // frontend domain
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Test Routes
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/api/auth/test", (req, res) => {
  res.send("API is working");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/chat", chatRoutes);

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("receiveMessage", data);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));