const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a name'],
            trim: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        rooms: {
            type: [String],
            required: true,
            trim: true,
        },
        cheapestPrice: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        distance: {
            type: String,
            required: true,
            trim: true,
        },
        photos: {
            type: [String],
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model('Hotels', HotelSchema);

module.exports = UserModel;