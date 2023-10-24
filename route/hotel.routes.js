const express = require('express');
const router = express.Router();

const { 
    createHotel, getHotels, getHotelRooms, countHotelByType, 
    countHotelByCity, getHotelById, getHotelsByMinMax, deleteByHotelId,
    updateHotelById
} = require('../controllers/hotel.controller');

router.post('/', createHotel);
router.put('/:hotelId', updateHotelById);
router.delete('/:hotelId', deleteByHotelId);
router.get('/all', getHotels);
router.get('/min-max', getHotelsByMinMax);
router.get('/rooms', getHotelRooms);
router.get('/count-by-type', countHotelByType);
router.get('/count-by-city', countHotelByCity);
router.get('/:hotelId', getHotelById);

module.exports = router;
