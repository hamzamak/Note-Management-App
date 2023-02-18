import React, { useEffect } from 'react'
import DataTable from '../components/DataTable'
import PageTitle from '../components/PageTitle'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER } from '../constants/utilConstants';
import { AUTH_ROUTE } from '../constants/routesConstants';
import { Paper } from '@mui/material';
import secureLocalStorage from 'react-secure-storage';
import TabNavigationNotes from '../components/TabNavigationNotes';
function GestionNotes() {
  const navigate = useNavigate()
  const user = secureLocalStorage.getItem(USER)
  const dispatch = useDispatch()


  useEffect(() => {
    if (!user) navigate(`${AUTH_ROUTE}`)
    if (user?.role ==="admin") navigate(`/notFound404`)
  }, [dispatch,user,navigate])
  
  return (
    <div style={{ maxWidth: "90%", margin: "auto" }}  >
    <PageTitle title="Gestion des notes" boxWidth={180} icon={<SchoolRoundedIcon fontSize='medium' />} iconBackgroundColor="linear-gradient(90deg,#da8cff,#9a55ff)" />
    <TabNavigationNotes/>
     <Paper>
        
     </Paper>
</div>
  )
}

export default GestionNotes