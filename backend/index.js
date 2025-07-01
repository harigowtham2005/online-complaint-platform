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

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://harigowtham2005.github.io',
    methods: ['GET', 'POST'],
    credentials: true
  }
});


app.use(cors({
  origin: 'https://harigowtham2005.github.io',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});


app.get("/api/auth/test", (req, res) => {
  res.send("API is working");
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("receiveMessage", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
