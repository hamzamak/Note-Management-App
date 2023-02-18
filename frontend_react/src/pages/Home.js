import React, { useEffect } from 'react'
import Groups2Icon from '@mui/icons-material/Groups2';
import Grid from '@mui/material/Grid';
import PaperData from '../components/Admin/PaperData';
import PageTitle from '../components/PageTitle';
import HomeIcon from '@mui/icons-material/Home';
import ControlledCarousel from '../components/EventCarousel';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../constants/utilConstants';
import { AUTH_ROUTE } from '../constants/routesConstants';
import secureLocalStorage from 'react-secure-storage';
import { getAllTeachers } from '../actions/professeur';
import { fecthFilieres } from '../actions/filiere';
import { fetchComptes } from '../actions/compte';
import { fetchStudents } from '../actions/etudiant';
import TodoList from '../components/todoList/TodoList';
import { fetchTodosByIdCompte } from '../actions/Todolist';
import CalendarSchedule from '../components/CalendarSchedule';
import { fetch_Events } from '../actions/event.js';
import { fecthElements } from '../actions/element';
import { fetchNotes } from '../actions/note';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
function Home() {
  const navigate = useNavigate()
  const user = secureLocalStorage.getItem(USER)
  const dispatch = useDispatch()
  useEffect(() => {

    if (!user) navigate(`${AUTH_ROUTE}`)
    if (user?.role === "professeur") {
      dispatch(fecthElements())
      dispatch(fetchNotes())
    }
    dispatch(getAllTeachers())
    dispatch(fecthFilieres())
    dispatch(fetchComptes())
    dispatch(fetchStudents())
    dispatch(fetchTodosByIdCompte(user?.id))
    dispatch(fetch_Events(user?.id))
  }, [dispatch, user, navigate])




  const professeurs = useSelector(state => state.adminReducers.teachers)
  const filieres = useSelector(state => state.adminReducers.filieres)
  const comptes = useSelector(state => state.adminReducers.comptes)
  const students = useSelector(state => state.adminReducers.students)
  const elements = useSelector(state => state.adminReducers.elements)
  const notes = useSelector(state => state.professeurReducers.notes)

  const elementsOfProfesseur = elements.map((e) => e.professeur.code === user.idProf)


  const StudentsUniqueFilter = () => {  // filtrer uniq les etudiants de professeur
    const noteOfProfesseur = notes.filter((n) => n.element.professeur.code === user.idProf)
    let uniqueStudents = noteOfProfesseur.filter((ele, ind) => ind === noteOfProfesseur.findIndex(elem => elem.etudiant.code === ele.etudiant.code)) // remove dupliquated modalites (par index) return table modalites
    console.log(uniqueStudents)
    return uniqueStudents;
  }
  // console.log(StudentsUniqueFilter())
  return (
    <div style={{ maxWidth: "90%", margin: "auto" }}  >

      <PageTitle title="Dashbord" icon={<HomeIcon fontSize='medium' />} iconBackgroundColor="linear-gradient(90deg,#da8cff,#9a55ff)" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={3} >
          <PaperData background="linear-gradient(90deg,#84d9d2,#07cdae)" data={professeurs.length} title="Professeurs" icon={<Groups2Icon fontSize='large' color='white' />} />
        
          </Grid>
        <Grid item xs={12} md={6} lg={3}  >
          <PaperData background="linear-gradient(90deg,#90caf9,#047edf 99%)" data={filieres.length} title="Filieres" icon={<DescriptionOutlinedIcon fontSize='large' color='white' />} />
        </Grid>
        <Grid item xs={12} md={6} lg={3} >
          {
            user?.role === 'admin' ?
              <PaperData background="linear-gradient(to right, #667eea , #764ba2)" data={students.length} title="Etudiants" icon={<SchoolRoundedIcon fontSize='large' color='white' />} />
              :
              <PaperData background="linear-gradient(to right, #667eea , #764ba2)" data={StudentsUniqueFilter().length} title="Etudiants" icon={<SchoolRoundedIcon fontSize='large' color='white' />} />

          }
        </Grid>

        <Grid item xs={12} md={6} lg={3}  >
          {
            user?.role === 'admin' ?
              <PaperData background="linear-gradient(90deg,#ffbf96,#fe7096)" data={comptes.length} title="Comptes" icon={<AccountBoxRoundedIcon fontSize='large' color='white' />} />
              :
              <PaperData background="linear-gradient(90deg,#ffbf96,#fe7096)" data={elementsOfProfesseur.length} title="Elements" icon={<AccountTreeIcon fontSize='large' color='white' />} />


          }
        </Grid>

      </Grid>
      <div style={{ marginTop: 15 }}>
        {

        }
        <CalendarSchedule />
      </div>
      {/* <ControlledCarousel /> */}
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12} md={7}>
          {/* <CalendarSchedule /> */}
        </Grid>

        <Grid item xs={12} md={5}>
          <TodoList />

        </Grid>

      </Grid>

    </div>

  )
}

export default Home