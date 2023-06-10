const pool = require('../database.js');
const dotenv = require('dotenv');

//this method adds dotenv variables to our process

const plantController = {};

function errorCreator (funcName, error){
  console.log(error.message);
  return {
    log: `Express error handler caught ${funcName} error with message ${error.message}`,
    status: 400,
    message: { err: error.message },
  }
}


plantController.addPlant = async (req,res,next) => {
  const { species, common_name, watering_frequency, days_between_watering, full_sun, part_sun, full_shade, image, user_id, room_id } = res.locals.plant;
  try {
    const query = `INSERT INTO public.plants (species, common_name, watering_frequency, days_between_watering, full_sun, part_sun, full_shade, image, user_id, room_id)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                  RETURNING *;`
    const result = await pool.query(query, [species, common_name, watering_frequency, days_between_watering, full_sun, part_sun, full_shade, image, user_id, room_id]);
    res.locals.dbPlant= result.rows[0];
    return next();             
  } catch (error) {
    return next(errorCreator('addPlant', error));
  }
}

plantController.findInformation = async(req, res, next) => {
  dotenv.config();
  const PERENUAL_KEY = process.env.PERENUAL_KEY;
  const { query, user_id, room_id } = req.body
  try {
    const result = await fetch(`https://perenual.com/api/species-list?key=${PERENUAL_KEY}&q=${query}`)
    const parsedResult = await result.json();
    console.log(parsedResult.data[0]);
    // store image, watering, sunlight, 
    const {scientific_name, common_name, watering, sunlight, default_image } = parsedResult.data[0]
    const {thumbnail} = default_image;
    let thirst = watering.toLowerCase()
  
    //watering: minimum = 1, average = 2, frequent = 3
    let watering_frequency, days_between_watering;

    if(thirst === 'frequent') {
      watering_frequency = 3;
      days_between_watering = 7;
    }
    else if (thirst === 'minimum') {
      watering_frequency = 1;
      days_between_watering = 21
    }
    else {
      watering_frequency = 2;
      days_between_watering = 14;
    }
    
    let lightNeeds = sunlight.join().toLowerCase();
    //sunlight: FullSun: true/false, PartSun/PartShade: true/false, FullShade: true/false
    let full_sun = lightNeeds.includes('full sun');
    let part_sun = lightNeeds.includes('part sun') || lightNeeds.includes('part shade');
    let full_shade = lightNeeds.includes('full shade');
    //catch all if none of these are true, default to part_sun
    if(!(full_sun || part_sun || full_shade)) part_sun = true;

    //store everything in res.locals.plant
    res.locals.plant = { species: scientific_name[0], common_name, watering_frequency, days_between_watering, full_sun, part_sun, full_shade, image: thumbnail, user_id, room_id };
    return next();
  } catch (err){
    console.log('perenual error')
  }
  return next('perenual error');
}

plantController.deletePlantById = async (req,res,next) => {
  try {
    const{ id } = req.params;
    const query = `DELETE FROM public.plants
                  WHERE _id = $1
                  RETURNING *;`;
    const result = await pool.query(query, [id]);
    res.locals.dbPlant = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('deletePlant', error));
  }

}

plantController.updatePlantById = async (req,res,next) => {
  try {
    const{ id } = req.params;
    const{ notes, nickname, species, common_name, watering_frequency, days_between_watering, full_sun, part_sun, full_shade, image, user_id, room_id} = req.body;
    const query = `UPDATE public.plants 
                  SET notes=$2, nickname=$3, species=$4, common_name=$5, 
                  watering_frequency=$6, days_between_watering=$7, full_sun=$8, 
                  part_sun=$9, full_shade=$10, image=$11, user_id=$12, room_id=$13
                  WHERE _id = $1
                  RETURNING *;`;
    const result = await pool.query(query, [id, notes, nickname, species, common_name, watering_frequency, days_between_watering, full_sun, part_sun, full_shade, image, user_id, room_id]);
    res.locals.dbPlant = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('deletePlant', error));
  }
}






// plantController.getPlantById = async (req,res,next) => {
//   try {
//     const{ id } = req.params;
//     const query = `SELECT * FROM public.plants
//                   WHERE _id = $1;`
//     const result = await pool.query(query, [id]);
//     res.locals.dbPlant = result.rows[0];
//     return next();   
//   } catch (error) {
//     return next(errorCreator('getPlant', error));
//   }
// }

// plantController.getAllPlantsByUser = async (req,res,next) => {
//   try {
//     const{ id } = req.params;
//     const query = `SELECT * FROM public.plants
//     WHERE user_id = $1;`;
//     const result = await pool.query(query, [id]);
//     res.locals.dbPlants= result.rows;
//     return next();   
//   } catch (error) {
//     return next(errorCreator('getAllPlantsByUser', error));
//   }
// };

// plantController.getAllPlantsByRoom = async (req,res,next) => {
//   try {
//     const{ id } = req.params;
//     const query = `SELECT * FROM public.plants
//                   WHERE room_id = $1;`;
//     const result = await pool.query(query, [id]);
//     res.locals.dbPlants = result.rows;
//     return next();   
//   } catch (error) {
//     return next(errorCreator('getAllPlantsByRoom', error));
//   }
// };


module.exports = plantController;