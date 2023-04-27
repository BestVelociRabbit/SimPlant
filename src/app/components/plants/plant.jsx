import React, { useState, useEffect } from 'react';
import './plantStyle.scss'

const Plant = (props) => {

  let common_name;
  let watering_frequency_per_week;
  let light;
  let species;


  if (props?.plant){
    ({ species, 
      common_name,
      watering_frequency_per_week, 
      light 
    } = props.plant);
  }

  function handleDeletePlant (e){
    const plantID = Number(e.target.parentNode.getAttribute('value'));
    props.deletePlant(plantID);
  }

  return(
      <>
        <p className="species">Name: {common_name}</p>
        <img className= "plant-img" src="https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png"></img>
        { props.isDropdown && 
          <>
            <p>Water {watering_frequency_per_week}x per week</p>
            <p>Light: {light}/10</p>
          </>
        }
        <button onClick={handleDeletePlant}>Delete</button>
      </>
  );
}

export default Plant;