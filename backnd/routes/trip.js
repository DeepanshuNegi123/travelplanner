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

// ✅ Cancel/Delete a booking
router.delete("/cancel/:userId/:tripIndex", async (req, res) => {
  const { userId, tripIndex } = req.params;

  console.log("🗑️ Cancel booking request received:", { userId, tripIndex });

  if (!userId || tripIndex === undefined) {
    console.log("❌ Missing data:", { userId: !!userId, tripIndex });
    return res.status(400).json({ message: "Missing userId or tripIndex" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("❌ User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const index = parseInt(tripIndex);
    
    if (isNaN(index) || index < 0 || index >= user.trips.length) {
      console.log("❌ Invalid trip index:", index, "Total trips:", user.trips.length);
      return res.status(400).json({ message: "Invalid trip index" });
    }

    // Get trip details for confirmation
    const tripToCancel = user.trips[index];
    console.log("✅ Found trip to cancel:", {
      destination: tripToCancel.destination?.name,
      hotel: tripToCancel.hotel?.name,
      checkIn: tripToCancel.checkIn,
      checkOut: tripToCancel.checkOut
    });

    // Remove the trip from the array
    user.trips.splice(index, 1);
    await user.save();

    console.log("✅ Trip cancelled successfully, remaining trips:", user.trips.length);
    res.status(200).json({ 
      success: true, 
      message: "Booking cancelled successfully",
      cancelledTrip: tripToCancel
    });
  } catch (err) {
    console.error("❌ Cancel booking error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all trips for a user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  console.log("📋 Get user trips request:", userId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("❌ User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User trips retrieved:", user.trips.length);
    res.status(200).json({ 
      success: true, 
      trips: user.trips,
      totalTrips: user.trips.length
    });
  } catch (err) {
    console.error("❌ Get trips error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
