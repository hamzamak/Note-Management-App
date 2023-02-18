import { Avatar, Badge, Box, IconButton, Popover, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import moment from 'moment';
import ChatIcon from '@mui/icons-material/Chat';import { useDispatch, useSelector } from 'react-redux';
import { delete_Notification } from '../actions/Notification';
function BadgeIconButton({ icon, handleClick, title, displayPopover = false }) {
  const theme = useTheme();
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteNotification = (idNotif) => {
    dispatch(delete_Notification(idNotif))
  }
  const { notifications } = useSelector(state => state.adminReducers);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Tooltip title={title}>
        {
          displayPopover ?
            <IconButton aria-describedby={id} onClick={handlePopoverOpen} sx={{ ml: 2.5, [theme.breakpoints.down('md')]: { ml: 0.5 } }}>
              <Badge color="secondary" badgeContent={notifications.length}>
                {icon}
              </Badge>
            </IconButton>

            :
            <IconButton onClick={handleClick} sx={{
              ml: 2.5, [theme.breakpoints.down('md')]: {
                ml: 0.5,
              },
            }}
            >

              <Badge color="secondary">
                {icon}
              </Badge>
            </IconButton>
        }
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
   sx={{ 
    width: 1400,
   }} 
      >
        {
          notifications.length > 0 ?
            notifications.map((n) => (
              <Box key={n.id} sx={{
               
                justifyContent: 'space-between', display: 'flex', alignItems: "center", background: "#edf1f7", p: 1.2,
                borderRadius: 3, m: 1.5
              }}  >
                <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "green", marginRight: 2 }}>
                    <ChatIcon />
                  </Avatar>
                  <Box>
                    <Typography sx={{ wordBreak: 'break-word', fontFamily: "Nunito" }}><strong>Message :</strong>  {n?.message} </Typography>
                    <Typography variant='subtitle2' sx={{ wordBreak: 'break-word', fontFamily: "Nunito" }}>{moment(n?.createdAt).format('DD MMM YYYY, h:mm:ss a')}</Typography>
                  </Box>

                </div>
                <Tooltip title="supprimer la notification" arrow>
                  <IconButton onClick={() => handleDeleteNotification(n.id)}>
                    <RemoveCircleIcon color='error' />
                  </IconButton>
                </Tooltip>
              </Box>
            ))
            :
            <div style={{ width: "70%", margin: "auto", display: "flex", alignItems: "center", flexDirection: "column", paddingTop: 25 }}>
              <svg width="50" height="50" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
              <p style={{textAlign:"center",fontFamily:'Nunito'}}>Pas de Notifications pour le moment</p>
            </div>
        }

      </Popover>
    </>

  )
}

export default BadgeIconButton