// const pool = require('../database.js');

// function errorCreator(funcName, error) {
//   console.log(error.message);
//   return {
//     log: `Express error handler caught ${funcName} error with message ${error.message}`,
//     status: 400,
//     message: { err: error.message },
//   };
// }
// const wateringController = {
//   getPlantWatering: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const query = `SELECT * FROM public.plant_watering WHERE user_id = $1;`;
//       const result = await pool.query(query, [id]);
//       res.locals.waterings = result.rows[0];
//     } catch (error) {
//       return next(errorCreator('getPlantWatering', error));
//     }
//   },
//   // (async () => {
//   //   console.log('getPlantWatering', await getPlantWatering(1));
//   // })();

//   /* get all plant_watering events of day and return events */
//   /* (dayID: number) -> Promise<array<object>> */
//   getAllPlantWateringsByDay: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const query = `SELECT * FROM public.plant_watering 
//                     WHERE day_id = $1;`;
//       const result = await pool.query(query, [id]);
//       res.locals.waterings = result.rows;
//       return next();
//     } catch (error) {
//       return next(errorCreator('getAllPlantWateringsByDay', error));
//     }
//   },
//   // (async ()=> {console.log('getAllPlantWateringsByDay', await getAllPlantWateringsByDay(1))})();

//   /* get all plant_watering events of plant and return events */
//   /* (plantID: number) -> Promise<array<object>> */
//   getAllPlantWateringsByPlant: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const query = `SELECT * FROM public.plant_watering 
//               WHERE plants_id = $1;`;
//       const result = await pool.query(query, [id]);
//       res.locals.waterings = result.rows;
//       return next();
//     } catch (error) {
//       return next(errorCreator('getAllPlantWateringsByPlant', error));
//     }
//   },

//   // (async () => {
//   //   console.log('getAllPlantWateringsByPlant', await getAllPlantWateringsByPlant(1));
//   // })();

//   /* add plant_watering event and return new event */
//   /* (plantWatering: object) -> Promise<object> */
//   addPlantWatering: async (req, res, next) => {
//     try {
//       const { plants_id, day_id } = req.body;
//       //create query
//       const query = `INSERT INTO public.plant_watering (plants_id, day_id) 
//                     VALUES ($1, $2)
//                     RETURNING *;`;
//       const result = await pool.query(query, [plants_id, day_id]);
//       res.locals.watering = result.rows[0];
//       return next();
//     } catch (error) {
//       return next(errorCreator('addPlantWatering', error));
//     }
//   },
//   // (async () => {
//   //   const plantWatering = {plants_id: 1, day_id: 1};
//   //   console.log('addPlantWatering', await addPlantWatering(plantWatering));
//   // })();

//   /* delete plant_watering event and return deleted event */
//   /* (plantWateringID: number) -> Promise<object> */
//   deletePlantWatering: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const query = `DELETE FROM public.plant_watering
//                       WHERE _id = $1
//                       RETURNING *;`;
//       const result = await pool.query(query, [id]);
//       res.locals.watering = result.rows[0];
//       return next();
//     } catch (error) {
//       return next(errorCreator('deletePlantWatering', error));
//     }
//   },
// };

// module.exports = wateringController;
