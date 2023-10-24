const express = require('express');
const router = express.Router();

const { 
    createHotel, getHotels, getHotelRooms, countHotelByType, 
    countHotelByCity, getHotelById 
} = require('../controllers/hotel.controller');

router.post('/', createHotel);
router.get('/', getHotels);
router.get('/rooms', getHotelRooms);
router.get('/count-by-type', countHotelByType);
router.get('/count-by-city', countHotelByCity);
router.get('/:hotelId', getHotelById);

module.exports = router;
