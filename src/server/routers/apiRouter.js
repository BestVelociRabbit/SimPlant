const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const plantRouter = require('./plantRouter');
const roomRouter = require('./roomRouter');
const userRouter = require('./userRouter');
// const dayRouter = require('./dayRouter');
// const wateringRouter = require('./wateringRouter');

const express = require('express');
const router = express.Router();

//plant
router.use('/plant', plantRouter);
//room
router.use('/room', roomRouter);
//user
router.use('/user', userRouter);
// //day
// router.use('/day', dayRouter);
// //water
// router.use('/water', wateringRouter);

module.exports = router;
