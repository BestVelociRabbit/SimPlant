const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//need a login endpoint*********
router.get('/', 
  userController.getAllUsers, 
  (req, res) => {
    res.status(200).json(res.locals.users)
  });

router.get('/:id', 
  userController.getUser, 
  (req, res) => {
    res.status(200).json(res.locals.user)
  });

router.get('/:id/state', 
  userController.getState, 
  (req, res) => {
    res.status(200).json(res.locals.data)
  });

router.post('/', 
  userController.addUser, 
  (req, res) => {
    res.status(201).json(res.locals.user)
  });

router.delete('/:id', 
  userController.deleteUser, 
  (req, res) => {
    res.status(200).json(res.locals.user)
  });

router.put('/:id', 
  userController.updateUser, 
  (req, res) => {
    res.status(200).json(res.locals.user)
  });


module.exports = router