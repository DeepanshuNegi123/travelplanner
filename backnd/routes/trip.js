const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/book", async (req, res) => {
  const { userId, trip } = req.body;

  console.log("📝 Trip booking request received:", { userId, trip });

  if (!userId || !trip) {
    console.log("❌ Missing data:", { userId: !!userId, trip: !!trip });
    return res.status(400).json({ message: "Missing userId or trip data" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("❌ User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User found, current trips:", user.trips.length);
    
    user.trips.push(trip); // ✅ Add trip to user's trips
    await user.save();

    console.log("✅ Trip saved successfully, new trips count:", user.trips.length);
    res.status(201).json({ success: true, message: "Trip booked and saved" });
  } catch (err) {
    console.error("❌ Trip booking error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
