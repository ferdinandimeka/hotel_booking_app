const express = require('express');
const { verifyUser, verifyAdmin } = require('../middleware/verifyToken');
const {updateUser, deleteUser, getUser, getUsers} = require('../controllers/user.controller');

const router = express.Router();

router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyAdmin, deleteUser);
router.get('/user/:id', verifyUser, getUser);
router.get('/:id', verifyAdmin, getUsers);


module.exports = router;
