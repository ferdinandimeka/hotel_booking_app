const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { errorUtils } = require("../utils/error.utils");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.token;
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
        let token;

        if(req.headers.token === verifyToken && req.headers.token.startsWith('Bearer')) {
            token = req.headers.token.split(' ')[1];
        }
        next();
    } catch (error) {
        next(error)
    }
}

exports.verifyAdmin = async (req, res, next) => {
    try {
        let token;

        if(req.headers.token === verifyToken && req.headers.token.startsWith('Bearer')) {
            token = req.headers.token.split(' ')[1];
        }

        if(req.user.isAdmin) {
            next();
        }
        return next(errorUtils(403, 'You are not allowed to do that'));

    } catch (error) {
        next(error)
    }
}