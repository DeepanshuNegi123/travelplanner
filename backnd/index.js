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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(" MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
});

// Use auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

app.use("/api/trip", require("./routes/trip"));

// Root route
app.get('/', (req, res) => {
  res.send("Server has been started");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

/* 
  1. use module in import/export type 
  2. use better industry wide nomenculture and directory structure
    eg : models.filename.js

  3. don't track node_modules in the projects - It gives bad impression to recruters or visitors.
*/
