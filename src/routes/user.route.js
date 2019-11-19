const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const verifyToken = require('../helpers/verifyToken');
//create  a new user
router.post('/users', user.create);
router.get('/users', user.findAll);
router.get('/users/:id', user.findOne);
router.post('/users/:id', user.updateOne);
// router.put('/users/:id', user.updateOne);
router.delete('/users/:id', user.deleteOne);

module.exports = router;