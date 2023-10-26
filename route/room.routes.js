const express = require('express');
const router = express.Router();

const { createRoom, updateRoomAvailability, getRoom,
     getRooms, deleteRoom 
    } = require('../controllers/room.controller');

router.post('/:hotelId', createRoom);
router.patch('/update', updateRoomAvailability);
router.get('/:roomId', getRoom);
router.get('', getRooms);
router.delete('/delete/:roomId', deleteRoom);

module.exports = router;