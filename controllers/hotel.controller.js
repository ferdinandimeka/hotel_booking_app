const Hotel = require('../models/hotel.model');
const Room = require('../models/room.model');
const errorUtils = require('../utils/error.utils');

exports.createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    if (!newHotel) return next(errorUtils(400, 'Hotel is required'));

    try {
        const hotel = await newHotel.save();

        res.status(200).send({
            hotel: hotel,
            message: 'Hotel created successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.deleteByHotelId = async (req, res, next) => {
    const { hotelId } = req.params;

    if (!hotelId) return next(errorUtils(400, 'hotelId is required'));

    try {
        const deleteHotel = await Hotel.findByIdAndDelete(hotelId);

        if (!deleteHotel) return next(errorUtils(404, 'Hotel not found'));

        res.status(200).send({
            message: 'Hotel deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

exports.getHotelById = async (req, res, next) => {
    const { hotelId } = req.params;

    if (!hotelId) return next(errorUtils(400, 'hotelId is required'));

    try {
        const hotel = await Hotel.findById(hotelId);
        res.status(200).send({
            hotel: hotel,
            message: 'Hotel fetched successfully'
        });

    } catch (error) {
        next(error)
    }
}

exports.getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find().limit(req.query.limit);
        res.status(200).send({
            hotels: hotels,
            message: 'Hotels fetched successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.getHotelsByMinMax = async (req, res, next) => {
    const { min, max, ...rest} = req.query;

    if (min && isNaN(min) || max && isNaN(max)) return next(errorUtils(400, 'min should be a number'));

    try {
        const hotels = await Hotel.find({
            ...rest,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 }
        }).limit(req.query.limit);

        res.status(200).send({
            hotels: hotels,
            message: 'Hotels fetched successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.countHotelByCity = async (req, res, next) => {
    const cities = req.query.cities;

    if (!cities) return next(errorUtils(400, 'Cities should be provided as an array'));

     // Check if cities is an array
  if (!Array.isArray(cities)) {
        return res.status(400).json({ error: 'Cities should be provided as an array' });
  }

    try {
        const list = await Promise.all(
            cities.map(async (city) => {
                const count = await Hotel.countDocuments({ city });
                return { city, count };
            })
        );
        res.status(200).send({
            list: list,
        });
    } catch (error) {
        next(error)
    }
}

exports.countHotelByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const cabinCount = await Hotel.countDocuments({ type: "cabi" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        res.send([
            { type: "hotel", count: hotelCount },
            { type: "resort", count: resortCount },
            { type: "cabin", count: cabinCount },
            { type: "villa", count: villaCount },
            { type: "apartment", count: apartmentCount },
        ]);
    } catch (error) {
        next(error)
    }
}

exports.getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Room.find({ hotelId: req.params.id });

        if (!hotel) return next(errorUtils(404, 'Hotel not found'));

        const roomsList = await Promise.all(
            hotel.map(async (room) => {
                return await Room.findById(room);
            })
        );
        res.status(200).send({
            rooms: roomsList,
            message: 'Rooms fetched successfully'
        });
    } catch (error) {
        next(error)
    }
}

exports.updateHotelById = async (req, res, next) => {
    const { hotelId } = req.params;
    const hotelUpdates = req.body;

    if (!hotelId) return next(errorUtils(400, 'hotelId is required'));

    if (!hotelUpdates) return next(errorUtils(400, 'Data not provided'));

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(hotelId, hotelUpdates, {
            new: true,
        })

        if (!updateHotel) return next(errorUtils(404, 'Hotel not found'));

        res.status(200).send({
            hotel: updateHotel,
            message: 'Hotel updated successfully'
        })
    } catch (error) {
        next(error)
    }
}