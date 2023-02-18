import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import TopicIcon from '@mui/icons-material/Topic';
import secureLocalStorage from 'react-secure-storage';
import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material';
import DataTable from '../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../actions/professeur';
import { useNavigate } from 'react-router-dom';
import { USER } from '../constants/utilConstants';
import { fecthFilieres } from '../actions/filiere';
import moment from 'moment'
import { fecthModules } from '../actions/module';
import { AUTH_ROUTE } from '../constants/routesConstants';
import { fecthElements, updateElementsToTeacher } from '../actions/element';
import TransferList from '../components/TransferList';
import Swal from 'sweetalert2';
import DropItemMenuProfesseur from './DropItemMenuProfesseur';
import { fetchNotes } from '../actions/note';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function TabNavigation() {
 
  const [targetKeys, setTargetKeys] = useState([]); // ids values
  const [value, setValue] = React.useState(0);
  const [professeur_code, setProfesseur_code] = React.useState('');

  const valider = () => {
    for (let i = 0; i < targetKeys.length; i++) {
      //+ pour transformer en nombre
      dispatch(updateElementsToTeacher({ idElement: +targetKeys[i], idProfesseur: +professeur_code }))
    }
    setTargetKeys([]) //clear right list
    if(targetKeys.length > 0) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        
  
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
  
      Toast.fire({
        icon: 'success',
        title: 'les elements sont bien affectes',
       
  })
    }

  }

const handleChange = (event, newValue) => {
  setValue(newValue);
};

///*************************************** */

const navigate = useNavigate()
const user = secureLocalStorage.getItem(USER)
//const user = JSON.parse(localStorage.getItem(USER))
const dispatch = useDispatch()
useEffect(() => {
  dispatch(getAllTeachers())
  dispatch(fecthFilieres())
  dispatch(fecthModules())
  dispatch(fecthElements())
  dispatch(fetchNotes())
}, [dispatch])

const professeurs = useSelector(state => state.adminReducers.teachers)
const filieres = useSelector(state => state.adminReducers.filieres)
const modules = useSelector(state => state.adminReducers.modules)
const elements = useSelector(state => state.adminReducers.elements)
const notes = useSelector(state => state.professeurReducers.notes)
useEffect(() => {
  if (!user) navigate(`${AUTH_ROUTE}`)
}, [dispatch, user, navigate])

const Filiere_columns = [
  { field: 'id', headerName: 'ID', width: 110, headerClassName: 'super-app-theme--header', },
  {
    field: 'nom',
    headerName: 'Nom',
    width: 250,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'createdAt',
    headerName: 'Date de creation',
    width: 293,
    headerClassName: 'super-app-theme--header',
    valueFormatter: params =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  },

];

const Module_columns = [
  { field: 'id', headerName: 'ID', width: 60, headerClassName: 'super-app-theme--header', },
  {
    field: 'nom',
    headerName: 'Nom',
    width: 230,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'isValid',
    headerName: 'Valide',
    width: 83,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'filiere', //car ca c'est un objet
    headerName: 'Filiere',
    headerClassName: 'super-app-theme--header',
    width: 180,
    renderCell: (params) => {
      return <Typography> {params.row.filiere.nom} </Typography>
    }
  },
  {
    field: 'semestre',
    headerName: 'Semestre',
    width: 100,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return <Typography> {params.row.semestre.nom} </Typography>
    }
  },
]

const filiere_rows = filieres;
const module_rows = modules;



return (
  <div >
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="gestion cours">
          <Tab icon={<TopicIcon fontSize='large' />} label="Affichage" sx={{ minWidth: "50%", fontFamily: 'Laila', fontWeight: 'bold' }} />
          <Tab icon={<CandlestickChartIcon fontSize='large' />} label="Affectation des elements" sx={{ minWidth: "50%", fontFamily: 'Laila', fontWeight: 'bold' }} />

        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
        <Grid container spacing={3} >
              <Grid item xs={12} md={6} lg={6}>
                <div >
                  <Typography variant='h6' sx={{textAlign:"center",fontFamily:"Nunito"}}>Filieres</Typography>
                  <DataTable rows={filiere_rows} columns={Filiere_columns}  heightTable={371} displayToolBar={false} bgColorHeader="#48b1bf" typeId='id' pageSizeProps={5}/>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <div >
                  <Typography variant='h6' sx={{textAlign:"center",fontFamily:"Nunito"}}>Modules</Typography>
                  <DataTable rows={module_rows} columns={Module_columns} isIdRowField={true} heightTable={371} displayToolBar={false} bgColorHeader="#48b1bf" typeId='id' pageSizeProps={5}/>
                </div>
              </Grid>
            </Grid>
      </TabPanel>



      <TabPanel value={value} index={1}>
        <Paper elevation={8} sx={{ mt: 3, p: 4, borderRadius: 4 }} >
          <Typography variant="h5" sx={{ fontFamily: "Montserrat", textAlign: "center", mb: 3 }}>Affectation des elements aux professeurs</Typography>

          <Grid container spacing={3} >
            <Grid item xs={12} md={4} lg={4}>
              <DropItemMenuProfesseur items={professeurs} stateItem={professeur_code} setStateItem={setProfesseur_code} />

            </Grid>
            <Grid item xs={9} md={10} lg={12} >
              <div>
                <TransferList dataSource={elements} targetKeys={targetKeys} setTargetKeys={setTargetKeys} notes={notes} />
              </div>

            </Grid>
            <Grid item >

              <Button variant='contained' color='success' sx={{ width: 200, mt: 2 }} onClick={valider} disabled={!professeur_code ? true : false} >Valider</Button>
            </Grid>
          </Grid>


        </Paper>
      </TabPanel>
    </Box>


  </div>


)
}
