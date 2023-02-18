import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function DropItemMenuProfesseur({ items, stateItem, setStateItem }) { 
  const handleChange = (event) => {
    setStateItem(event.target.value);
  };

  return (
    <FormControl sx={{  minWidth: '100%' }}>
      <InputLabel id="demo-simple-select-helper-label">Selectionner un professeur</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        label="Selectionner un professeur"
        value={stateItem}
        onChange={handleChange}
      >

        {
          items.map((item) =>
            <MenuItem sx={{fontFamily:"Nunito" , color : "black"}} key={item.code} value={item.code}>{ item.prenom + " "+ item.nom  } </MenuItem>
          )
        }
      </Select>

    </FormControl>


  )
}

export default DropItemMenuProfesseur