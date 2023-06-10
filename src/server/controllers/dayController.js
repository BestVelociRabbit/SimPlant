// const pool = require('../database.js');

// function errorCreator(funcName, error) {
//   console.log(error.message);
//   return {
//     log: `Express error handler caught ${funcName} error with message ${error.message}`,
//     status: 400,
//     message: { err: error.message },
//   };
// }

// const dayController = {
//   getDay: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const query = `SELECT * FROM public.day
//                     WHERE _id = $1;`;
//       const result = await pool.query(query, [id]);
//       res.locals.day = result.rows[0];
//       return next();
//     } catch (error) {
//       return next(errorCreator('getDay', error));
//     }
//   },

//   /* gets and returns all days of a given user from db */
//   /* (userID: number) -> plants: Promise<array<object>> */
//   getAllDays: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const query = `SELECT * FROM public.day
//                   WHERE user_id = $1;`;
//       const result = await pool.query(query, [id]);
//       res.locals.days = result.rows;
//       return next();
//     } catch (error) {
//       return next(errorCreator('getAllDays', error));
//     }
//   },

//   /* add day to db and return new day */
//   /* (day: object, userID: number) -> Promise<object> */
//   addDay: async (req, res, next) => {
//     const { day_num, user_id } = req.body;
//     try {
//       const query = `INSERT INTO public.day (day_num, user_id)
//                   VALUES ($1, $2)
//                   RETURNING *;`;
//       const result = await pool.query(query, [day_num, user_id]);
//       res.locals.day = result.rows[0];
//       return next();
//     } catch (error) {
//       return next(errorCreator('addDay', error));
//     }
//   },

//   /* deletes day and returns deleted day */
//   /* (dayID: number) -> Promise<object> */
//   deleteDay: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const query = `DELETE FROM public.day
//                   WHERE _id = $1
//                   RETURNING *;`;
//       const result = await pool.query(query, [id]);
//       res.locals.day = result.rows[0];
//       return next();
//     } catch (error) {
//       return next(errorCreator('deleteDay', error));
//     }
//   },
// };

// module.exports = dayController;
