import React from 'react';
import './plantStyle.scss'

const Plant = (props) => {
  // state for modal functionality
 



// props?.plant?.image
//   ? image = props.plant.image
//   : image = "https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png";

let { species, 
    image,
    common_name,
    days_between_watering, 
    full_sun,
    part_sun,
    full_shade,
    notes,
    nickname,
  } = props.plant;



  return(
      <>
        <p className="title">{common_name}</p>
        <img className= "plant-img" src={props?.plant.image || "https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png"}></img>
        { props.isDropdown && 
          <>
            <p>Species: {species}</p>
            <p>Water every {days_between_watering} days</p>
            <p>Good in {full_sun ? 'Full sun ' : ''}
            {part_sun ? 'Part sun ' : ''}
            {full_shade ? 'Full shade' : ''}</p>
            <button onMouseDown={e => props.deletePlant(props.plant._id)} className="delete">Delete</button>
          </>
        }
      </>
  );
}

export default Plant;


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