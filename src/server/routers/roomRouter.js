const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/user/:id', roomController.getAllRooms, (req, res) => {
  res.status(200).json(res.locals.rooms);
});

router.get('/:id', roomController.getRoom, (req, res) => {
  res.status(200).json(res.locals.room);
});

router.post('/', roomController.addRoom, (req, res) => {
  res.status(201).json(res.locals.room);
});

router.delete('/:id', roomController.deleteRoom, (req, res) => {
  res.status(200).json(res.locals.room);
});

router.put('/:id', roomController.updateRoom, (req, res) => {
  res.status(200).json(res.locals.room);
});

module.exports = router;
