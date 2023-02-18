import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'; import { Avatar } from '@mui/material';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import BadgeIconButton from './BadgeIconButton';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ListItemDrawer from './ListItemDrawer';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ACCOUNT, AUTH_ROUTE, COMPTE, GESTIONS, HOME, STUDENT, TEACHER } from '../constants/routesConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER } from '../constants/utilConstants';
import { LOGOUT } from '../constants/actionTypes';
import { useDispatch } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { fetch_Notification } from '../actions/Notification';
const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(0)} + 1px)`,   // ici modier spacing pour afficher ou non la petite bar icon selon breakpoint
  [theme.breakpoints.up('xl')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },

});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  

  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = React.useState(secureLocalStorage.getItem(USER))
  const dispatch = useDispatch()

  React.useEffect(() => {
    // if(user?.role === 'admin')
     dispatch(fetch_Notification())
    if (user) {
      if (user.exp * 1000 < new Date().getTime()) {
        logOut()
      }
    }

    setUser(secureLocalStorage.getItem(USER))
  }, [location,user])

  const logOut = () => {
    dispatch({ type: LOGOUT })
    setUser(null)
    navigate(AUTH_ROUTE)

  }

  return (
    <Box sx={{ display: 'flex', mb: 10 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon color='disabled' />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>

            <Box sx={{
              display: "flex", color: "gray", justifyContent: 'center', alignItems: 'center', fontFamily: "Nunito", [theme.breakpoints.down('md')]: {
                fontSize: 12
              },
            }}>
               {
                !user?.image ?  <Avatar sx={{ mr: 1.5, background: "linear-gradient(to right, #a8ff78, #78ffd6)" }}>{ user?.userName.charAt(0).toUpperCase()}</Avatar>
                :  <Avatar sx={{mr:1.5}} alt="image profil" src={user?.image}/>
                }
             
             
              <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>{user?.userName} </span>
            </Box>
          {
            user?.role ==="admin" &&
            <BadgeIconButton icon={<NotificationsActiveOutlinedIcon />} badge={4} title="notification" displayPopover={true} />
          }
            <BadgeIconButton icon={<PowerSettingsNewOutlinedIcon />} title="Log out" handleClick={logOut} />



          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader style={{ display: "flex", justifyContent: "space-between" }} >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AdminPanelSettingsIcon sx={{ ml: 1, mr: 1, color: "purple" }} />
            <span style={{ fontFamily: "Nunito" }}> {user?.role === "admin" ? "Admin Panel" : "Teacher Panel"} </span>
          </div>
          {/* <img src="https://technext.github.io/purple-react/static/media/logo-mini.d16823d3.svg"/> */}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemDrawer icon={<HomeRoundedIcon color='primary' />} text="Accueil" routeName={HOME} open={open} setOpen={setOpen} />
          <Divider sx={{ bgcolor: '#b2b9be' }} />
          {
            user?.role !=="admin" && <ListItemDrawer icon={<SchoolRoundedIcon color='primary' />} text="Notes" routeName={STUDENT} open={open} setOpen={setOpen} />
          }
          {
            
              user?.role ==="admin" && (
                <>
                <ListItemDrawer icon={<Groups2RoundedIcon color='primary' />} text="Professeurs" routeName={TEACHER} open={open} setOpen={setOpen} />
                <Divider />
                <ListItemDrawer icon={<DescriptionRoundedIcon color='primary' />} text="Filieres" routeName={GESTIONS} open={open} setOpen={setOpen} />
                <Divider />
                <ListItemDrawer icon={<AccountBoxRoundedIcon color='primary' />} text="Comptes" routeName={COMPTE} open={open} setOpen={setOpen} />
                <Divider />
                </>

              )
          }
          <ListItemDrawer icon={<LockPersonIcon color='primary' />} text="Account" routeName={ACCOUNT} open={open} setOpen={setOpen} />
          <Divider sx={{ bgcolor: '#b2b9be' }} />
          <ListItemDrawer icon={<LogoutRoundedIcon color='primary' />} text="LogOut" open={open} setOpen={setOpen} isLogOutBtn={true} handleLogout={logOut} />
        </List>


      </Drawer>
    </Box>
  );
}