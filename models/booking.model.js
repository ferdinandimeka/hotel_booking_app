const mongoose = require('mongoose');
const User = require('../models/user.model');
const Room = require('../models/room.model');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Room,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;