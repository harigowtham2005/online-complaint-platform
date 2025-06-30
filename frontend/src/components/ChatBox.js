import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with Render backend URL in production

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const name = localStorage.getItem("role") === "admin" ? "Admin" : "User";

  useEffect(() => {
    // Fetch old messages (optional)
    fetch("http://localhost:5000/api/chat", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.map(m => ({ sender: m.sender?.name || name, message: m.message })));
      });

    // Listen for real-time messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    const messageData = { sender: name, message: input };
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setInput("");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h4 className="mb-3">Live Chat</h4>
      <div className="border rounded p-3 mb-3" style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
