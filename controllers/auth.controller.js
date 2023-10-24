const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorUtils } = require("../utils/error.utils");

exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
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

        if(!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return next(errorUtils(401, 'Incorrect email or password'));
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES },
            { algorithm: 'HS256' }
        );

        const { password, isAdmin, ...rest } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

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
