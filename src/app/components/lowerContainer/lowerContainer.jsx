import React from 'react';
import './lowerContainerStyle.scss';
import FormContainer from '../formContainer/formContainer.jsx';
import Room from '../room/room.jsx';

//render room component
//render form container componenet - keeps track of current room

export default function LowerContainer(props) {
  return (
    <div className="lowerContainer">
      <FormContainer addRoom={props.addRoom} currentRoom={props.currentRoom} />
      <Room 
      updateRoom={props.updateRoom} 
      currentPlants={props.currentPlants}
      reorderRoom={props.reorderRoom} 
      currentRoom={props.currentRoom}/>
    </div>
  );
}
