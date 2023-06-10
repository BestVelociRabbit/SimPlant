const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

// //get all plants - dont actually do this
// router.get('/', plant)

// //get plant by user
// router.get('/user/:id', plantController.getAllPlantsByUser, (req, res) => {
//   res.status(200).json(res.locals.dbPlants);
// });

// //get all plants in room
// //needs middleware to check if room is owned by user, user is identified via cookie
// router.get('/room/:id', plantController.getAllPlantsByRoom, (req, res) => {
//   res.status(200).json(res.locals.dbPlants);
// });

// //get plant with id - not sure if we actually use this
// router.get('/:id', plantController.getPlantById, (req, res) => {
//   res.status(200).json(res.locals.dbPlant);
// });

//localhost:3000/api/plant/ ->  post plant
router.post(
  '/',
  plantController.findInformation,
  plantController.addPlant,
  (req, res) => {
    res.status(200).json(res.locals.dbPlant);
  }
);

router.delete('/:id', plantController.deletePlantById, (req, res) => {
  res.status(200).json(res.locals.dbPlant);
});

router.put('/:id', plantController.updatePlantById, (req, res) => {
  res.status(200).json(res.locals.dbPlant);
});
// router.put((req, res) => {});

module.exports = router;
