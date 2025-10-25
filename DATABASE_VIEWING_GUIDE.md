# How to View MongoDB Database Contents

## Method 1: MongoDB Compass (GUI - Recommended)

### Install MongoDB Compass:
```bash
# Download from: https://www.mongodb.com/products/compass
# Or install via package manager:
sudo apt install mongodb-compass
```

### Connect to Database:
1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. Navigate to `travelplanner` database
5. View `users` collection

---

## Method 2: MongoDB Shell (Command Line)

### Connect to MongoDB:
```bash
mongosh
```

### View Database Contents:
```javascript
// Switch to your database
use travelplanner

// View all collections
show collections

// View all users
db.users.find()

// View users with pretty formatting
db.users.find().pretty()

// Count total users
db.users.countDocuments()

// View a specific user by ID
db.users.findOne({_id: ObjectId("your-user-id-here")})

// View users with their trips
db.users.find({}, {firstName: 1, lastName: 1, email: 1, trips: 1}).pretty()
```

---

## Method 3: Using Node.js Script

### Create a script to view database:
```javascript
// view_db.js
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/travelplanner');

async function viewDatabase() {
  try {
    console.log('📊 Database Contents:');
    console.log('====================');
    
    const users = await User.find();
    console.log(`Total Users: ${users.length}`);
    
    users.forEach((user, index) => {
      console.log(`\n👤 User ${index + 1}:`);
      console.log(`   Name: ${user.firstName} ${user.lastName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Trips: ${user.trips.length}`);
      
      if (user.trips.length > 0) {
        console.log('   Trip Details:');
        user.trips.forEach((trip, tripIndex) => {
          console.log(`     Trip ${tripIndex + 1}:`);
          console.log(`       Destination: ${trip.destination?.name || 'N/A'}`);
          console.log(`       Hotel: ${trip.hotel?.name || 'N/A'}`);
          console.log(`       Dates: ${trip.checkIn} to ${trip.checkOut}`);
          console.log(`       Travelers: ${trip.travelers}`);
          console.log(`       Total Cost: $${trip.totalCost}`);
        });
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

viewDatabase();
```

### Run the script:
```bash
cd backnd
node view_db.js
```

---

## Method 4: Quick Database Check

### Simple one-liner to check if data exists:
```bash
# Connect and check users
mongosh travelplanner --eval "db.users.find().count()"

# View all users
mongosh travelplanner --eval "db.users.find().pretty()"

# Check trips in all users
mongosh travelplanner --eval "db.users.find({}, {trips: 1}).pretty()"
```

---

## Method 5: Browser-based MongoDB Admin (Alternative)

### Install mongo-express:
```bash
npm install -g mongo-express
mongo-express
```

### Access at: http://localhost:8081

---

## Quick Commands Reference:

```bash
# Start MongoDB (if not running)
sudo systemctl start mongod

# Connect to MongoDB shell
mongosh

# In MongoDB shell:
use travelplanner
db.users.find().pretty()
db.users.find({trips: {$exists: true, $ne: []}})
```

---

## Troubleshooting:

### If MongoDB is not running:
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

### If connection fails:
```bash
# Check if MongoDB is listening
netstat -tulpn | grep 27017
```

### Reset database (if needed):
```bash
mongosh travelplanner --eval "db.dropDatabase()"
```
