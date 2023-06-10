import React, { useState, useEffect } from 'react';
import './mainPageStyle.scss';
import RoomMenu from '../roomMenu/roomMenu.jsx';
import LowerContainer from '../lowerContainer/lowerContainer.jsx';
import api from '../../api';
// ADD import getAllPlants and getAllRooms from API !!!!!!!!!!!!!!!!!!!

//main container page acts as parent component - stateful component

//render drop down menu to navigate btwn rooms -roomMenu
//render lowerContainer to hold room and input forms - pass props through lower container

// state:
// rooms
// current room
// plants
// current plants

function MainPage() {
  const [rooms, setRooms] = useState([null]);
  const [currentRoom, setCurrentRoom] = useState();
  const [plants, setPlants] = useState([null]);
  // only show plants in current room
  const [currentPlants, setCurrentPlants] = useState([]);
  const [user,setUser] = useState(null);
  
  // function getAccountData() {
  //   return new Promise((resolve) => {
  //     //      resolve([]);
      
  //     resolve({
  //       rooms: [
  //         { _id: 1, name: 'Living Room' },
  //         { _id: 2, name: 'Kitchen' },
  //       ],
  //       plants: [
  //         { _id: 1, room_id: 1, species: "Big Ol' Cactus" },
  //         { _id: 2, room_id: 2, species: "Just a li'l guy" },
  //       ]
  //     });
  //   });
  // }

  //come back to figure out what happens when you have rooms with the same name
  function changeCurrentRoom(roomID){
    setCurrentRoom(rooms.find(room=> room._id === Number(roomID)));
  }

  //come back to it once backend is fleshed out ************
  async function addRoom(roomObj) {
    const data = await api.addRoom({...roomObj, user_id: user})
    const newRoom = await data.json();
    setRooms(prevRooms => [newRoom, ...prevRooms]);
  }

  async function deleteRoom(){
    const {_id} = currentRoom;
    setRooms(prevRooms=> prevRooms.filter(room=>room._id !== _id))
    await api.deleteRoom(_id);
  }

  //built only for light
  async function updateRoom(light){
    setRooms(prevRooms => {
      const current = [];
      const restOfRooms = [];
      prevRooms.forEach(room=> room._id === currentRoom._id ?
        current.push({...room,light}) :
        restOfRooms.push(room));
      return current.concat(restOfRooms);
      })
  }
  async function reorderRoom(plantArr){
    setCurrentPlants(plantArr)
  }

  async function addPlant(plant){
    const data = await api.addPlant({
      ...plant, 
      user_id : user,
      room_id : currentRoom._id
    })
    const newPlant = await data.json();
    setPlants(prevPlants=>[...prevPlants,newPlant])
  }
  async function deletePlant(id){
    setPlants(prevPlants=>{
      const plantArr = prevPlants.slice();
      return plantArr.filter(p => p._id !== id)
    })
    await api.deletePlant(id);
  }
  
  // hard code userID
  const userID = 1;
  // will need to make async
  
//  useEffect for Rooms and Plants
  useEffect(() => {
    async function initialize() { 
      const accountData = await api.getUserState(userID);
      const data = await accountData.json();
      setUser(data._id);
      setRooms(data.state.rooms.reverse());
      setPlants(data.state.plants);
    }
    initialize();
  }, []);

  // any time rooms changes, this useEffect runs
  useEffect(() => {

    async function initialize() {
      setCurrentRoom(rooms[0]);
    }
    initialize();
  }, [rooms]);

  // set current plants, dependent on plants
  useEffect(() => {
    async function initialize() {
      setCurrentPlants(()=>{
        return plants.filter((plant) => Number(plant?.room_id) === currentRoom?._id)
    })
    }
    initialize();
  }, [plants, currentRoom]);

  return (
    <div className="page">
      <RoomMenu changeCurrentRoom={changeCurrentRoom} rooms={rooms} currentRoom={currentRoom}/>
      <LowerContainer 
        updateRoom={updateRoom} 
        addRoom={addRoom} 
        currentRoom={currentRoom}
        addPlant={addPlant}
        deletePlant={deletePlant} 
        currentPlants={currentPlants} 
        reorderRoom={reorderRoom}/>
        <div className='buttonContainer'>
          <button onClick ={deleteRoom}>Delete Current Room</button>
        </div>
    </div>
  );
}

export default MainPage;
