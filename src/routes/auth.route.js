const express = require('express');
const router = express.Router();
const user = require('../controllers/auth.controller');

//create  a new user
router.post('/auth/register/', user.create);

// login user
router.post('/auth/login', user.login);

module.exports = router;