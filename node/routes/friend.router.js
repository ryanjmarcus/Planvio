const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/add', friendController.createFriend());
router.get('/getAll', friendController.getFriends());


module.exports = router;
