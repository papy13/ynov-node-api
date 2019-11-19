const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const verifyToken = require('../helpers/verifyToken');
//create  a new user
router.post('/users', user.create);
router.get('/users', verifyToken, user.findAll);

module.exports = router;