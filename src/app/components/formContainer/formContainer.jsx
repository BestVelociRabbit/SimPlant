import React, {useState, useEffect} from 'react';
import './formContainerStyle.scss';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function FormContainer(props) {

  const [plantSuggest, setPlantSuggest] = useState([]);

  useEffect(()=>{
    fetch('/speciesList')
      .then((data)=>data.json())
      .then((wholeList)=> {
        //console.log(wholeList[0]);
        setPlantSuggest(wholeList)})
      .catch((err)=> console.log('error',err))
  },[]);

  function onRoomSubmit (e) {
    //props.addRoom();
    e.preventDefault();
    let form = new FormData(e.target)
    form = Object.fromEntries(form.entries());
    for (const property in form) {
      if (!isNaN(Number(form[property]))) {
        form[property] = Number(form[property])
      }
    }
    props.addRoom(form);
  }

const onPlantSubmit = (e) => {
  e.preventDefault();
  let form = new FormData(e.target);
  form = Object.fromEntries(form.entries());
  const newStr = form.query.split('(')[1].split(')')[0];
  form.query = newStr;
  // console.log(form);
  props.addPlant(form);
}

  return (
    <div className="formContainer">
      <form className="roomForm" onSubmit={onRoomSubmit}>
        <div className="formTitle">ADD ROOM</div>
        <input
          name="name"
          className="inputField"
          type="text"
          placeholder="Room Name" 
        ></input>
        <select name="light">
          <option value={1}>Please Choose a Lighting Level</option>
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <form className="plantForm" onSubmit={onPlantSubmit}>
        <div className="formTitle">ADD PLANT</div>
        {/* <input
          name="query"
          type="text"
          placeholder="Plant Species"
        ></input> */}

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          getOptionLabel={(option) => `${option.common} (${option.scientific})`}
          options={plantSuggest}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField name="query" {...params} label="Plant" />}
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
