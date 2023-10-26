const Booking = require('../models/booking.model');
const User = require('../models/user.model');

exports.createBooking = async (req, res, next) => {
    const { hotelId } = req.params;
    const { userId, roomId, checkIn, checkOut } = req.body;

    if (!checkIn || !checkOut) return next(errorUtils(400, 'checkIn and checkOut are required'));

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
        return next(errorUtils(400, 'dates must be in ISO format'));
    }

    if (!hotelId || !roomId || !checkInDate || !checkOutDate) {
        return next(errorUtils(400, 'Invalid input data'));
    }

    if (checkInDate >= checkOutDate || checkInDate < new Date() || checkOutDate < new Date()) {
        return next(errorUtils(400, 'Invalid check-in or check-out dates'));
    }

    const user = await User.findById(userId);

    if (!user) {
        return next(errorUtils(404, 'User not found'));
    }

    const overLappingBookings = await Booking.find({
        room: roomId,
        $or: [
            { checkInDate: { $lt: checkOutDate } },
            { checkOutDate: { $gt: checkInDate } },
        ],
    });

    if (overLappingBookings.length > 0) {
        return next(errorUtils(400, 'Room has been booked for this date range'));
    }

    try {
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return next(errorUtils(404, 'Hotel not found'));
        }

        const room = await Room.findById(roomId);
        if (!room || !hotel.rooms.includes(roomId)) {
            return next(errorUtils(404, 'Room not found in this hotel'));
        }

        const isRoomAvailable = room.roomNumbers.every((roomNumber) => {
            return roomNumber.unAvailableDates.every((date) => {
                const dateStr = date.toISOString();
                return !dateStr.includes(checkInDate.toISOString()) &&
                    !dateStr.includes(checkOutDate.toISOString());
            });
        });

        if (!isRoomAvailable) {
            return next(errorUtils(404, 'Room is unavailable for this date range'));
        }

        const booking = new Booking({
            user: user._id,
            room: roomId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
        });

        await booking.save();

        res.status(201).send({
            bookingDetails: booking,
            message: 'Booking created successfully',
        });
    } catch (error) {
        next(error);
    }
};



exports.deleteBooking = async (req, res, next) => {
    try {
        const { bookingId, userId } = req.body;

        if (!bookingId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Both bookingId and userId are required.",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found.",
            });
        }

        const deletedBooking = await Booking.findOneAndDelete({
            _id: bookingId,
            user: userId,
        });

        if (!deletedBooking) {
            return res.status(404).send({
                success: false,
                message: "Booking not found.",
            });
        }

        res.status(200).send({
            success: true,
            message: "Booking deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

exports.getBookings = async (req, res, next) => {

    try {
        const bookings = await Booking.find();

        if (!bookings) {
            return res.status(404).send({
                success: false,
                message: "No bookings found.",
            });
        }

        res.status(200).send({
            success: true,
            bookings: bookings,
            message: "Bookings fetched successfully.",
        });
    } catch (error) {
        next(error);
    }
}

exports.updateBooking = async (req, res, next) => {
    try {
        const { bookingId, userId, checkIn, checkOut } = req.body;

        if (!bookingId || !userId || !checkIn || !checkOut) {
            return res.status(400).send({
                success: false,
                message: "bookingId, userId, checkIn and checkOut are required.",
            });
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (isNaN(checkInDate) || isNaN(checkOutDate)) {
            return res.status(400).send({
                success: false,
                message: "dates must be in ISO format.",
            });
        }

        if (checkInDate >= checkOutDate || checkInDate < new Date() || checkOutDate < new Date()) {
            return res.status(400).send({
                success: false,
                message: "Invalid check-in or check-out dates.",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found.",
            });
        }

        const booking = await Booking.findOneAndUpdate(
            { _id: bookingId, user: userId },
            { checkInDate: checkInDate, checkOutDate: checkOutDate },
            { new: true }
        );

        if (!booking) {
            return res.status(404).send({
                success: false,
                message: "Booking not found.",
            });
        }

        res.status(200).send({
            success: true,
            booking: booking,
            message: "Booking updated successfully.",
        });
    } catch (error) {
        next(error);
    }
}
