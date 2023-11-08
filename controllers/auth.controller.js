const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorUtils = require("../utils/error.utils");
const { sendEmail } = require("../utils/email");
const crypto = require('crypto');

exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const user = await Users.create({
            ...req.body,
            password: hashedPassword,
        });

        res.status(200).send({ 
            user: user,
            message: 'User created successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email } = req.body;
        const pass = req.body.password;

        if(!email || !pass) {
            return next(errorUtils(400, 'Please provide email and password'));
        }

        const user = await Users.findOne({ email }).select('+password');

        if(!user || !(await bcrypt.compare(pass, user.password))) {
            return next(errorUtils(401, 'Incorrect email or password'));
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES },
            { algorithm: 'HS256' }
        );

        const { password, isAdmin, ...rest } = user._doc;

        // res.cookie('access_token', token, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000, // 1 day
        // });

        res.status(200).send({ 
            user: { ...rest },
            access_token: token,
            isAdmin: isAdmin,
            message: 'User logged in successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.forgotPassword = async (req, res, next) => {
    // get the user based on email
    const user = await Users.findOne({ email: req.body.email });

    if(!user) {
        return next(errorUtils(404, 'There is no user with this email address'));
    }

    // create a random token
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false });

    // send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password 
    and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore 
    this email!`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message,
        });

        res.status(200).send({
            success: true,
            message: 'Token sent to email!'
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(errorUtils(500, 'There was an error sending the email. Try again later!'));
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        // get user based on the token
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const hashedPassword = bcrypt.hashSync(req.body.password, 12);

        const user = await Users.findOne({ 
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        // if token has not expired, and there is user, set the new password
        if(!user) {
            return next(errorUtils(400, 'Token is invalid or has expired'));
        }

        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // update changedPasswordAt property for the user
        // log the user in, send JWT
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES },
            { algorithm: 'HS256' }
        );

        const { password, isAdmin, ...rest } = user._doc;

        res.status(200).send({ 
            user: { ...rest },
            access_token: token,
            isAdmin: isAdmin,
            message: 'User logged in successfully'
        });
    } catch (error) {
        next(error)
    }
}