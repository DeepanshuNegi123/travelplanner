#!/usr/bin/env node

// Test script to verify cancel booking functionality
const mongoose = require('mongoose');
const User = require('./models/user');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function testCancelBooking() {
  try {
    console.log('🧪 Testing Cancel Booking Functionality');
    console.log('=====================================');
    
    // Find a user with trips
    const user = await User.findOne({ trips: { $exists: true, $ne: [] } });
    
    if (!user) {
      console.log('❌ No user with trips found. Please create a booking first.');
      return;
    }
    
    console.log(`✅ Found user: ${user.firstName} ${user.lastName}`);
    console.log(`📊 Current trips count: ${user.trips.length}`);
    
    if (user.trips.length === 0) {
      console.log('❌ User has no trips to cancel');
      return;
    }
    
    // Show first trip details
    const firstTrip = user.trips[0];
    console.log('\n📍 First trip details:');
    console.log(`   Destination: ${firstTrip.destination?.name || 'N/A'}`);
    console.log(`   Hotel: ${firstTrip.hotel?.name || 'N/A'}`);
    console.log(`   Check-in: ${firstTrip.checkIn}`);
    console.log(`   Check-out: ${firstTrip.checkOut}`);
    console.log(`   Cost: $${firstTrip.totalCost}`);
    
    // Test the cancel API endpoint
    console.log('\n🧪 Testing API endpoint...');
    
    const response = await fetch(`http://localhost:4002/api/trip/cancel/${user._id}/0`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Cancel booking API test successful!');
      console.log('📝 Response:', data.message);
      
      // Verify the trip was actually removed
      const updatedUser = await User.findById(user._id);
      console.log(`📊 Updated trips count: ${updatedUser.trips.length}`);
      
      if (updatedUser.trips.length === user.trips.length - 1) {
        console.log('✅ Trip successfully removed from database!');
      } else {
        console.log('❌ Trip was not removed from database');
      }
    } else {
      console.log('❌ Cancel booking API test failed:', data.message);
    }
    
  } catch (error) {
    console.error('🔥 Test error:', error.message);
  } finally {
    mongoose.disconnect();
    console.log('\n✅ Test completed');
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  testCancelBooking();
}

module.exports = testCancelBooking;
