const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4002;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
});

// Use auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

app.use("/api/trip", require("./routes/trip"));

// Proxy chat route (forwards requests to OpenRouter with server-side key)
app.use("/api/chat", require("./routes/chat"));

// Root route
app.get('/', (req, res) => {
  res.send("Server has been started");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
