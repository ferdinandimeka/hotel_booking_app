const Users = require('../models/user.model');
const errorUtils = require('../utils/error.utils');

exports.updateUser = async (req, res, next) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });

        if (!user) return next(errorUtils(404, 'User not found'));

        res.status(200).send({
            user: user,
            message: 'User updated successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {

    if (!req.params.id) return next(errorUtils(400, 'User id is required'));

    try {
        const user = await Users.findByIdAndDelete(req.params.id);

        if (!user) return next(errorUtils(404, 'User not found'));

        res.status(200).send({
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.getUser = async (req, res, next) => {

    if (!req.params.id) return next(errorUtils(400, 'User id is required'));

    try {
        const user = await Users.findById(req.params.id);

        if (!user) return next(errorUtils(404, 'User not found'));

        res.status(200).send({
            user: user,
            message: 'User fetched successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await Users.find();

        if (!users) return next(errorUtils(404, 'Users not found'));

        res.status(200).send({
            users: users,
            message: 'Users fetched successfully'
        });
    } catch (error) {
        next(error)
    }
}