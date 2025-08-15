const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");


// ✅ Register a new user
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log("📨 New registration attempt:", { firstName, lastName, email });

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    console.log("✅ Registered successfully:", email);
    res.status(201).json({ message: "Registration successful", userId: newUser._id }); // ✅ FIXED

  } catch (error) {
    console.error("🔥 Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Login a user
router.post("/login", async (req, res) => {
  try {
    console.log("📨 Login request received");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Login successful for:", email);
    return res.status(200).json({ message: "Login successful", userId: user._id });

  } catch (error) {
    console.error("🔥 Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});




// ✅ Fetch user data by ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("🔥 Error fetching user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
