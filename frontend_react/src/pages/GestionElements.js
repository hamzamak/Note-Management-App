import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { useDispatch } from 'react-redux';
import { getAllTeachers } from '../actions/professeur';
import { useNavigate } from 'react-router-dom';
import { USER } from '../constants/utilConstants';
import { fecthFilieres } from '../actions/filiere';
import { fecthModules } from '../actions/module';
import { AUTH_ROUTE } from '../constants/routesConstants';
import { fecthElements } from '../actions/element';
import secureLocalStorage from 'react-secure-storage';
import TabNavigation from '../components/TabNavigation';
function GestionElements() {

  const navigate = useNavigate()
  const user = secureLocalStorage.getItem(USER)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllTeachers())
    dispatch(fecthFilieres())
    dispatch(fecthModules())
    dispatch(fecthElements())
  }, [dispatch])

  useEffect(() => {
    if (!user) navigate(`${AUTH_ROUTE}`)
    if (user?.role !=="admin") navigate(`/notFound404`)
  }, [dispatch, user, navigate])

  return (
    <div style={{ maxWidth: "90%", margin: "auto" }}  >
      <PageTitle title="Gestion des Elements" icon={<DescriptionRoundedIcon fontSize='medium' />} iconBackgroundColor="linear-gradient(90deg,#da8cff,#9a55ff)" boxWidth={215} />
      <TabNavigation/>
    </div>
  )
}

export default GestionElements