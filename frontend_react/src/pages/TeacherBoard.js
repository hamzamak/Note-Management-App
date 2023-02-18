import React, { useEffect } from 'react'
import DataTable from '../components/DataTable'
import PageTitle from '../components/PageTitle'
import Groups2Icon from '@mui/icons-material/Groups2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../actions/professeur';

import { useNavigate } from 'react-router-dom';

import { USER } from '../constants/utilConstants';
import { AUTH_ROUTE } from '../constants/routesConstants';
import secureLocalStorage from 'react-secure-storage';
import { Typography } from '@mui/material';
function TeacherBoard() {
  const navigate = useNavigate()
  const user = secureLocalStorage.getItem(USER)
 
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) navigate(`${AUTH_ROUTE}`)
    if (user?.role !=="admin") navigate(`/notFound404`)
  }, [dispatch,user,navigate])

  const professeurs = useSelector(state => state.adminReducers.teachers)
  const rows = professeurs;
  const columns = [
    { field: 'code', headerName: 'Code', width: 150, headerClassName: 'super-app-theme--header', },
    {
      field: 'prenom',
      headerName: 'Prenom',
      width: 160,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: 180,
      headerClassName: 'super-app-theme--header',
    },

    {
      field: 'email',
      headerName: 'Email',
      width: 314,
      headerClassName: 'super-app-theme--header',

    },
    {
      field: 'specialite',
      headerName: 'Specialite',
      width: 290,
      headerClassName: 'super-app-theme--header',

    },
    {
      field: 'tel',
      headerName: 'Telephone',
      width: 280,
      headerClassName: 'super-app-theme--header',

    },
   /* {
      field: 'compte',  
      headerName: 'Compte Associe',
      width: 170,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return <Typography> { params.row.compte ? params.row.compte.login : "nulle"} </Typography>
      }
    },*/
  ];

  useEffect(() => {
    dispatch(getAllTeachers())
  }, [dispatch])
  
  return (
    <div style={{ maxWidth: "90%", margin: "auto" }}  >
      
      <PageTitle title="Professeurs" icon={<Groups2Icon fontSize='medium' />} iconBackgroundColor="linear-gradient(90deg,#da8cff,#9a55ff)" />
      <DataTable rows={rows} columns={columns} bgColorHeader="#1976d2" />
    </div>
  )
}

export default TeacherBoard