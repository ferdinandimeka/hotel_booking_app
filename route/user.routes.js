const express = require('express');
const { verifyUser, verifyAdmin } = require('../middleware/verifyToken');
const {updateUser, deleteUser, getUser, getUsers} = require('../controllers/user.controller');

const router = express.Router();

router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getUser);
router.get('/', verifyUser, getUsers);


module.exports = router;
