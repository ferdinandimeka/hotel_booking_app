const mongoose = require('mongoose');

// Define a subdocument schema for room numbers and unavailable dates
const roomNumberSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  unAvailableDates: {
    type: [Date],
    default: [new Date()],
  },
});

// Define the main room schema
const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '', // Set the default value as an empty string
    trim: true,
  },
  roomNumbers: [roomNumberSchema], // Use the subdocument schema
}, {
  timestamps: true,
});

// Create a virtual property to count the total available rooms
roomSchema.virtual('totalAvailableRooms').get(function() {
  return this.roomNumbers.length;
});

const RoomModel = mongoose.model('Room', roomSchema);

module.exports = RoomModel;
