const express = require('express');
const router = express.Router();

const { createRoom, updateRoomAvailability, getRoom } = require('../controllers/room.controller');

router.post('/:hotelId', createRoom);
router.patch('/update', updateRoomAvailability);
router.get('/:roomId', getRoom);

module.exports = router;