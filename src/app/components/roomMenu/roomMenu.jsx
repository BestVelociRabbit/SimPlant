import React,{useState, useEffect} from 'react';
import './roomMenuStyle.scss';

export default function RoomMenu(props) {
  // add props to component
  const [roomOptions, setRoomOptions] = useState([]);

  useEffect(() => {
    if(props.rooms && props.rooms.length){
      const options = props.rooms.map((room) => {
        return (
          <option value={room?._id} key={room?._id}>
            {room?.name}
          </option>
        );
      });
      setRoomOptions(options);
    } else {
      setRoomOptions([<option key="empty" value="empty">Add a room first!</option>]);
    }
  }, [props.rooms]);

  return (
    <nav id="roomMenu">
      <select name="rooms" value={props.currentRoom ? props.currentRoom._id : ''}
 onChange={(e)=>{props.changeCurrentRoom(e.target.value)}}>{roomOptions}</select>
    </nav>
  );
}
