const mongoose = require("mongoose");
const express = require("express");
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);

/* 
  use models.message.js 
  - better industry wide nomenculture 
  -improve the code structure 
*/