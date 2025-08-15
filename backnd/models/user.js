const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: Object,
  hotel: Object,
  checkIn: String,
  checkOut: String,
  travelers: Number,
  travelerType: String,
  totalCost: Number
}, { _id: false }); // prevent auto-adding _id for each trip

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  trips:     [tripSchema] // ✅ added trips array
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
