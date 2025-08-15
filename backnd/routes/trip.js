const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/book", async (req, res) => {
  const { userId, trip } = req.body;

  if (!userId || !trip) {
    return res.status(400).json({ message: "Missing userId or trip data" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.trips.push(trip); // ✅ Add trip to user's trips
    await user.save();

    res.status(201).json({ success: true, message: "Trip booked and saved" });
  } catch (err) {
    console.error("❌ Trip booking error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
