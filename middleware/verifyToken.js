const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Users = require("../models/user.model");
const errorUtils = require("../utils/error.utils");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.Authorization;
        if(!token) {
            return next(errorUtils(401, 'You are not authenticated'));
        }

        await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY, { algorithms: ['HS384'] }, (err, user) => {
            if(err) {
                return next(errorUtils(401, 'Invalid token'));
            }
            req.user = user;
            next();
        });
    } catch (error) {
        next(error)
    }
}

exports.verifyUser = async (req, res, next) => {
    try {

        if(req.headers.Authorization === verifyToken && req.headers.Authorization.startsWith('Bearer')) {
            token = req.headers.token.split(' ')[1];
        }
        next();
    } catch (error) {
        next(error)
    }
}

exports.verifyAdmin = async (req, res, next) => {

    const token = req.headers.Authorization;
    const userId = req.params.id;
    let auth;

    if (!userId) return next(errorUtils(400, 'User id is required'));

    try {

        if(token === verifyToken && token.startsWith('Bearer')) {
            auth = token.split(' ')[1];
        }

        const user = await Users.findById(userId);

        if (!user) return next(errorUtils(404, 'User not found'));

        if(user.isAdmin === true) {
            next();
        }

        if (user.isAdmin === false) {
            return next(errorUtils(403, 'You are not authorized to perform this action'));
        }
        
    } catch (error) {
        next(error)
    }
}