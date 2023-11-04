const mongoose = require('mongoose');
const crypto = require('crypto');

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
        passwordResetToken: String,
        passwordResetExpires: Date,
        passwordChangedAt: Date,
    },
    {
        timestamps: true
    }
);

UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({resetToken}, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const UserModel =  mongoose.model('Users', UserSchema);

module.exports = UserModel;