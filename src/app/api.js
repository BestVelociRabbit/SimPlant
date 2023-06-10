const api = {};

// pointing to routes on backend

//add a user
api.addUser = async (body) => {
  // { username, password } = req.body
  try {
    return await fetch('/api/user', {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('user post request err')
  }
}
//get state for user
api.getUserState = async (user_id) => {
  // return object has {username: string, state: {rooms: [roomObj], plants: [plantObj]}  }
  // // roomObj example {
  //               "_id": 1,
  //               "name": "Living Room",
  //               "light": 2,
  //               "user_id": 1
  //           },
  
  //   plantObj example {
  //     "_id": 3,
  //     "nickname": null,
  //     "species": "Monstera deliciosa",
  //     "common_name": "Swiss cheese plant",
  //     "watering_frequency": 2,
  //     "days_between_watering": 14,
  //     "full_sun": true,
  //     "part_sun": true,
  //     "full_shade": false,
  //     "notes": null,
  //     "image": "https://perenual.com/storage/species_image/5257_monstera_deliciosa/thumbnail/4630938853_623dc33137_b.jpg",
  //     "user_id": "1",
  //     "room_id": "2"
  // }
  try {
    return await fetch(`/api/user/${user_id}/state`)
  } catch (err){
    console.log('user get request err')
  }
}

//updateUser
api.updateUser = async (body) => {
  // { user_id, username, password } = body
  try {
    return await fetch(`/api/user/${body.user_id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('user put request err')
  }
}

//addPlant
api.addPlant = async (body) => {
  // const {query , user_id, room_id } = req.body
  //query is either scientific name or common name. Can be any part of it
  try {
    return await fetch('api/plant', {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('plant post request err')
  }
}

api.updatePlant = async (body) => {
  // _id is the plant id
  // const {_id, notes, nickname, species, common_name, watering_frequency,
  // days_between_watering, full_sun, part_sun, full_shade, image, user_id, room_id} = req.body
  try {
    return await fetch(`api/plant/${body._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('plant update request err')
  }
}

//deletePlant
api.deletePlant = async (plantID) => {
  try {
    return await fetch(`api/plant/${plantID}`, {
    method: "DELETE"})
 
  } catch (err){
    console.log('plant delete request err')
  }
}

//addRoom
api.addRoom = async (body) => {
  //const { name, light, user_id } = req.body;
  try {
    return await fetch('api/room', {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('room post request err')
  }
}

//deleteRoom
api.deleteRoom = async (roomID) => {
  try {
    return await fetch(`api/room/${roomID}`, {
    method: "DELETE"})
 
  } catch (err){
    console.log('room delete request err')
  }
}

//updateRoom
api.updateRoom = async (body) => {
  //const { _id, name, light, user_id } = req.body;
  try {
    return await fetch(`api/room/${body._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('room put request err')
  }
}
export default api;