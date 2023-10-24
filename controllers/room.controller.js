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
        console.log(room)
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