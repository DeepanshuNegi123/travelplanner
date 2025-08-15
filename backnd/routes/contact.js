const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const mongoose = require("mongoose");

/*  - have the files Name as routes.contact.js 
    -use better practises
*/

router.post("/", async (req, res) => {
  const { name, email, message, userId } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMessage = new Message({ name, email, message, userId: userId || null });
    await newMessage.save();

    console.log("✅ Message saved for:", email);
    res.status(201).json({ success: true, message: "Message received!" });
  } catch (err) {
    console.error("🔥 Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
