import ChatMessage from "../models/ChatMessage.js";

export const getMessages = async (req, res) => {
  const messages = await ChatMessage.find().populate("sender", "name");
  res.json(messages);
};
