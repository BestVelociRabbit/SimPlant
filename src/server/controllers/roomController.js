const pool = require('../database.js');

function errorCreator(funcName, error) {
  console.log(error.message);
  return {
    log: `Express error handler caught ${funcName} error with message ${error.message}`,
    status: 400,
    message: { err: error.message },
  };
}

const roomController = {};

/* gets room from db and returns room */
/* (roomID: number) -> room: Promise<object> */
roomController.getRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM public.rooms
                    WHERE _id = $1;`;
    const result = await pool.query(query, [id]);
    res.locals.room = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('getRoom', error));
  }
};

/* gets all rooms of user from db and returns all rooms */
/* (userID: number) -> rooms: Promise<array<object>> */
roomController.getAllRooms = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM public.rooms
                    WHERE user_id = $1;`;
    const result = await pool.query(query, [id]);
    res.locals.rooms = result.rows;
    return next();
  } catch (error) {
    return next(errorCreator('getAllRooms', error));
  }
};
// (async () => {
//   console.log('getAllRooms', await getAllRooms(userID));
// })();

// do we need to pass in userID if it is already a prop on the newRoom obj?
/* adds room of user to db and returns new room */
/* (room: object, userID: number) -> room: Promise<object> */
roomController.addRoom = async (req, res, next) => {
  try {
    const { name, light, user_id } = req.body;
    const values = [name, light, user_id];
    const query = `INSERT INTO public.rooms (name, light, user_id)
                    VALUES ($1, $2, $3)
                    RETURNING *;`;
    const result = await pool.query(query, values);
    res.locals.room = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('addRoom', error));
  }
};

/* deletes room of user and returns deleted room */
/* (roomID: number) -> room: Promise<object> */
roomController.deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM public.rooms
                    WHERE _id = $1
                    RETURNING *;`;
    const result = await pool.query(query, [id]);
    res.locals.room = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('deleteRoom', error));
  }
};
// (async () => {
//   console.log('deleteRoom', await deleteRoom(roomID));
// })();

/* updates room and returns updated room */
/* (updatedRoom: object, roomID: number) -> room: Promise<object> */
roomController.updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, light, user_id} = req.body;
    console.log("updating room #", id)
    const values = [name, light,  user_id, id];
    const query = `UPDATE public.rooms
                    SET name = $1, light = $2, user_id = $3
                    WHERE _id = $4
                    RETURNING *;`;
    const result = await pool.query(query, values);
    res.locals.room = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('updateRoom', error));
  }
};
module.exports = roomController;
