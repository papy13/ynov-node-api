const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');

router.use(userRouter);
router.use(authRouter);

module.exports = router;