const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            trim: true,
        },
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        phone: {
            type: String,
            required: [true, 'Please enter your phone number'],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);

const UserModel =  mongoose.model('Users', UserSchema);

module.exports = UserModel;