const express = require('express');
const router = express.Router();

const { 
    createBooking, deleteBooking, getBookings,
    updateBooking
} = require('../controllers/book.controller');

router.post('/:hotelId/book', createBooking);
router.delete('/:hotelId/book/delete', deleteBooking);
router.get('/all-bookings', getBookings);
router.put('/book/update', updateBooking);

module.exports = router;
