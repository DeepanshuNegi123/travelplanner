// Script to view database contents
const mongoose = require('mongoose');
const User = require('./models/user');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function viewDatabase() {
  try {
    console.log('📊 Travel Planner Database Contents');
    console.log('==================================');
    
    const users = await User.find();
    console.log(`\n👥 Total Users: ${users.length}`);
    
    if (users.length === 0) {
      console.log('\n❌ No users found in database');
      console.log('💡 Tip: Register a user first to see data');
      return;
    }
    
    users.forEach((user, index) => {
      console.log(`\n👤 User ${index + 1}:`);
      console.log(`   Name: ${user.firstName} ${user.lastName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   User ID: ${user._id}`);
      console.log(`   Trips: ${user.trips.length}`);
      
      if (user.trips.length > 0) {
        console.log('   📍 Trip Details:');
        user.trips.forEach((trip, tripIndex) => {
          console.log(`     Trip ${tripIndex + 1}:`);
          console.log(`       🏛️  Destination: ${trip.destination?.name || 'N/A'}`);
          console.log(`       🏨 Hotel: ${trip.hotel?.name || 'N/A'}`);
          console.log(`       📅 Dates: ${trip.checkIn} to ${trip.checkOut}`);
          console.log(`       👥 Travelers: ${trip.travelers}`);
          console.log(`       💰 Total Cost: $${trip.totalCost}`);
          console.log(`       🎯 Type: ${trip.travelerType}`);
        });
      } else {
        console.log('   📝 No trips booked yet');
      }
    });
    
    // Summary
    const totalTrips = users.reduce((sum, user) => sum + user.trips.length, 0);
    console.log(`\n📈 Summary:`);
    console.log(`   Total Users: ${users.length}`);
    console.log(`   Total Trips: ${totalTrips}`);
    
  } catch (error) {
    console.error('❌ Error viewing database:', error.message);
  } finally {
    mongoose.disconnect();
    console.log('\n✅ Database connection closed');
  }
}

viewDatabase();
