import { Avatar, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Paper, Popover, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import CachedIcon from '@mui/icons-material/Cached';
import DataTable from '../components/DataTable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../constants/utilConstants';
import { useNavigate } from 'react-router-dom';
import { addCompte, deleteCompte, fetchComptes } from '../actions/compte';
import Swal from 'sweetalert2';
import { AUTH_ROUTE } from '../constants/routesConstants';
import secureLocalStorage from 'react-secure-storage';
import { getAllTeachers } from '../actions/professeur';
import EmailIcon from '@mui/icons-material/Email';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CircleIcon from '@mui/icons-material/Circle';
import PageTitle from '../components/PageTitle'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import DropItemMenuProfesseur from '../components/DropItemMenuProfesseur';
function Compte() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  const user = secureLocalStorage.getItem(USER)
  // const user = JSON.parse(localStorage.getItem(USER))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialState = { login: '', password: '', /*repassword: '', role: 'professeur'*/ }; // password ='' raison de crypto password il faut envoyer password not null pour role par default professeur
  const [currentId, setCurrentId] = useState(0)
  const [professeurState, setProfesseurState] = useState('')
  const [errorLogin, setErrorLogin] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [checked, setChecked] = useState(true);
  const [formData, setFormData] = useState(initialState)
  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value })

  }
  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.login.length === 0) { setErrorLogin("login doit etre mentione"); setErrorPassword("") }
    else if (formData.login.length < 4) { setErrorLogin("login doit avoir au moins 4 lettres"); setErrorPassword("") }

    else {

     // console.log({ login: formData.login, password: formData.password, professeur: { code: +professeurState }, sendEmail: checked })
      dispatch(addCompte({ login: formData.login, password: formData.password, professeur: { code: +professeurState }, sendEmail: checked }))


      clear()
    }

  };
  useEffect(() => {
    if (!user) navigate(`${AUTH_ROUTE}`)
    if (user?.role !== "admin") navigate(`/notFound404`)
    dispatch(fetchComptes())
    dispatch(getAllTeachers())

  }, [dispatch])
  const professeurs = useSelector(state => state.adminReducers.teachers)
  const comptes = useSelector(state => state.adminReducers.comptes)

  const cmp = useSelector((state) => (currentId ? state.adminReducers.comptes.find((c) => c.id === currentId) : null));

  useEffect(() => {
    if (cmp) setFormData({ ...formData, login: cmp?.login, role: cmp?.role });
  }, [cmp]);

  const handleDeleteCompte = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: `Vous voulez vraiment supprimer ce compte`,
      icon: 'warning',
      confirmButtonText: 'Oui , Continuer!',
      cancelButtonText: 'Non!',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCompte(id))
        Swal.fire(
          'Le Compte est Supprime!',
          'Terminee',
          'success'
        )

      }
    })

  }
   
  const rows = comptes.filter((c)=> c.role ==="professeur");
  const columns = [
    { field: 'id', headerName: 'ID', width: 40, headerClassName: 'super-app-theme--header', hide: true },
    {
      field: 'image', headerName: 'Profil', width: 75, headerClassName: 'super-app-theme--header', sortable: false,
      renderCell: (params) => {
        return <div>
          {
            !params.row.image ? <Avatar src={params.row.image} sx={{ mr: 1.5, background: "linear-gradient(to right, #2193b0 , #6dd5ed)" }}></Avatar>
              : <Avatar sx={{ mr: 1.5 }} alt="image profil" src={params.row.image} />
          }


        </div>
      }

    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 70,
      headerClassName: 'super-app-theme--header',
      align: 'center',

      renderCell: (params) => {
        return <div>
          <Tooltip title={!params.row.isActive ? "l'utilsateur de ce compte n'a pas encore sign up !" : null}>
            <IconButton>
              <CircleIcon sx={{ fontFamily: "Nunito", color: !params.row.isActive ? "red" : "#00FF00", fontSize: 17 }} />
            </IconButton>
          </Tooltip>


        </div>
      }

    },

    {
      field: 'login',
      headerName: 'Login',
      width: 260,
      headerClassName: 'super-app-theme--header',
    },


    {
      field: 'role',
      headerName: 'Role',
      width: 105,
      headerClassName: 'super-app-theme--header',

    },


    {
      field: 'professeur',
      headerName: 'Email du Professeur ',
      width: 235,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return <div>
          {params.row.professeur ? (<Typography sx={{ fontFamily: "Nunito" }}> {params.row.professeur?.email} </Typography>) :
            "******************************"}
        </div>
      }

    },

    {
      field: 'Actions', headerName: 'Actions', width: 162, sortable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {

        return <div >
          {/* <Button variant='outlined' color='warning' sx={{ mr: 2 }} onClick={(e) => { e.preventDefault(); setCurrentId(params.row.id) }} ><EditIcon /></Button> */}
          {
            params.row.role !== 'admin' ? (<Button variant='contained' color='error' onClick={(e) => { handleDeleteCompte(e, params.row.id) }}  ><DeleteIcon /></Button>)
              : "No Action"
          }


        </div>;
      }

    },
  ];

  const clear = () => {
    // setCurrentId(0);
    setErrorLogin("")
    setErrorPassword("")
    setCurrentId(0)
    setFormData({ ...formData, login: '', password: '', repassword: '' });
  };

  return (
    <div style={{ maxWidth: "90%", margin: "auto" }}   >
      <PageTitle title="Comptes" icon={<AccountBoxRoundedIcon fontSize='medium' />} iconBackgroundColor="linear-gradient(90deg,#da8cff,#9a55ff)" />
      <Grid container spacing={3}>

        <Grid item xs={12} md={6} lg={4}  >
          <Paper elevation={6} sx={{ borderRadius: 2 }} >
            <form autoComplete="off" noValidate style={{ padding: 20 }}  >
              <Typography sx={{ textAlign: "center", fontFamily: "Nunito" }} variant="h6">Creation du Compte</Typography>

              <TextField name="login" variant="outlined" required label="login" fullWidth value={formData.login} onChange={handleChange} margin="dense" helperText={errorLogin} error={errorLogin ? true : false} sx={{ mb: 2 }} />
              {/* <TextField name="password" variant="outlined" required label="password" type="password" fullWidth value={formData.password} onChange={handleChange} margin="dense" helperText={errorPassword} error={errorPassword ? true : false} />
              <TextField name="repassword" variant="outlined" required label="re-password" type="password" fullWidth value={formData.repassword} onChange={handleChange} margin="dense" /> */}

              <DropItemMenuProfesseur items={professeurs} stateItem={professeurState} setStateItem={setProfesseurState} />




              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <FormControl  >
                  <FormControlLabel control={<Checkbox
                    checked={checked}

                    checkedIcon={<EmailIcon />}
                    icon={<EmailIcon color='disabled' />}
                    onChange={(e) => setChecked(!checked)}
                    inputProps={{ 'aria-label': 'controlled' }}

                  />} label="Envoyer un email" />

                </FormControl>
                <IconButton
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}>
                  <HelpOutlineIcon color="primary" />

                </IconButton>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1, fontFamily: "Nunito" }}>Envoyer un email au professeur du compte <br /> pour recuperer son login et activer son compte</Typography>
                </Popover>

              </div>

              <Button variant="contained" color="primary" sx={{ mb: 2, mt: 1 }} size="medium" fullWidth endIcon={currentId ? <EditIcon fontSize="inherit" /> : <SendIcon fontSize="inherit" />} onClick={handleSubmit} disabled={professeurs.length === 0 || !professeurState ? true : false}>Creer</Button>
              <Button variant="contained" color="secondary" size="medium" onClick={clear} fullWidth endIcon={<CachedIcon fontSize="inherit" />} >Annuler</Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={8}  >
          <DataTable rows={rows} columns={columns} typeId='id' displayToolBar={false} setCurrentId={setCurrentId} bgColorHeader="#1976d2" />
        </Grid>
      </Grid>


    </div>
  )
}

export default Compte