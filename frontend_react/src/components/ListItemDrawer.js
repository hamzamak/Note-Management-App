import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { AUTH_ROUTE } from '../constants/routesConstants';
function ListItemDrawer({icon,text,routeName,open,setOpen ,handleLogout,isLogOutBtn=false}) {
  
  return (
    <ListItem  disablePadding sx={{ display: 'block', }}  component={Link} to={!isLogOutBtn ? routeName : AUTH_ROUTE } onClick={()=>{open && setOpen(!open) ; (isLogOutBtn && handleLogout())}}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 ,color:"black",'& .css-10hburv-MuiTypography-root':{fontFamily:'Nunito'}}} />
    </ListItemButton>
  </ListItem>
  )
}

export default ListItemDrawer