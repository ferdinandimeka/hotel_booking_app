const Hotel = require('../models/hotel.model');
const Room = require('../models/room.model');
const errorUtils = require('../utils/error.utils');

exports.createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    if (!newRoom) return next(errorUtils(400, 'Room is required'));

    if (!hotelId) return next(errorUtils(400, 'hotelId is required'));

    try {
        const room = await newRoom.save();

        try {
            await Hotel.findByIdAndUpdate(
                hotelId,
                { $push: { rooms: room._id } },
                { new: true, useFindAndModify: false }
            );
            res.status(200).send({
                message: 'Room created successfully',
                room
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

exports.getRoom = async (req, res, next) => {

    if (!req.params.roomId) return next(errorUtils(400, 'roomId is required'));

    try {
        const room = await Room.findById(req.params.roomId);
        res.status(200).send({
            room
        });
    } catch (error) {
        next(error);
    }
}

exports.getRooms = async (req, res, next) => {

    if (!req.query.page || !req.query.limit)
    return next(errorUtils(400, 'query is required'));

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || 'createdAt';

        const query = Room.find().sort(sort).skip(skip).limit(limit);
        const rooms = await query.exec();
        const total = await Room.countDocuments();

        res.status(200).send({
            rooms,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        next(error);
    }
}

exports.updateRoomAvailability = async (req, res, next) => {

    try {
        const { roomId, dates } = req.body;

        if (!roomId) {
            return next(errorUtils(400, 'roomId is required'));
        }

        if (!dates || !Array.isArray(dates) || dates.length === 0) {
            return next(errorUtils(400, 'dates should be an array with at least one date'));
        }

        const room = await Room.findOneAndUpdate(
            { 'roomNumbers._id': roomId },
            { $push: { 'roomNumbers.$.unAvailableDates': { $each: dates } } },
            { new: true }
        );

        if (!room || !room.roomNumbers || room.roomNumbers.length === 0) {
            return next(errorUtils(404, 'Room not found'));
        }

        res.status(200).json({
            room,
            message: 'Room availability updated successfully',
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteRoom = async (req, res, next) => {
    
    if (!req.params.roomId) return next(errorUtils(400, 'roomId is required'));

    try {
        const room = await Room.findByIdAndDelete(req.params.roomId);

        if (!room) return next(errorUtils(404, 'Room not found'));

        res.status(200).send({
            success: true,
            message: 'Room deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}