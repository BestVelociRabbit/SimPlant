import React, { useEffect, useState } from 'react';
import './roomStyle.scss';
import Plant from '../plants/plant.jsx';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// const plant = {
//   species: 'Monstera deliciosa',
//   watering_frequency_per_week: 1,
//   humidity: 70,
//   light: 5,
// };
// /* {props.currentRoom && <div id="room-settings">
//       <form onChange={onSettingChange}>
//         <h4>Light Levels</h4>
//         <select value={props.currentRoom ? props.currentRoom.light : 0} name="light">
//             <option value={3}>High</option>
//             <option value={2}>Medium</option>
//             <option value={1}>Low</option>
//           </select>
//       </form>
//     </div>} */

export default function Room(props) {
  const [isDropdown, setIsDropdown] = useState([]);

  useEffect(() => {
    setIsDropdown(props.currentPlants.map(p => false));
  }, [props.currentPlants]);

  function handleOpenDropdown(e, i) {
    const target = document.querySelector(`#plant-${i}`);
    target.focus();
    setIsDropdown(prevArr => {
      const newArr = prevArr.slice();
      newArr.splice(i, 1, true)
      return newArr;
      })
  }

  function handleCloseDropdown(e, i) {
    //const target = document.querySelector(`#plant-${i}`);
    setIsDropdown(prevArr => {
      const newArr = prevArr.slice();
      newArr.splice(i, 1, false)
      return newArr;
    })
  }

  const plants = props.currentPlants.map((plant, i) => {
    return (
      <Draggable draggableId={`plant-${i}`} key={i} index={i}>
        {(provided)=>{
          return (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              
              value={plant?._id}
              className={`plant${isDropdown.length && isDropdown[i] ? ' plant-dropdown' : ''}`}
              onClick={e => handleOpenDropdown(e, i)}
              tabIndex="-1"
              onBlur={e => handleCloseDropdown(e, i)}
              id={`plant-${i}`}
            >
              <Plant
                currentRoom={props.currentRoom}
                plant={plant} 
                isDropdown ={isDropdown?.length ? isDropdown[i] : false}
                deletePlant={props.deletePlant}
              />
            </div>
            )
        }}
      </Draggable>
    );
  });

  function onSettingChange(e) {
    const lightVal = Number(e.target.value);
    props.updateRoom(lightVal);
  }
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const arr = props.currentPlants.slice();
      //grab the reordered item (remove from arr)
    const [reorderedItem] = arr.splice(result.source.index, 1);
      //insert item at the destination index, delete 0 items, replace with reorderedItem
    arr.splice(result.destination.index, 0, reorderedItem);
    props.reorderRoom(arr);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='room' direction="horizontal">
        {(provided,snapshot) => {
          return(
            <div id="room" 
              {...provided.droppableProps} 
              ref={provided.innerRef}>
              {props.currentPlants.length !== 0 && plants}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </DragDropContext>
    );
}
