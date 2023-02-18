import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tooltip, Typography } from '@mui/material';
import StepperModalite from './StepperModalite';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import ArticleIcon from '@mui/icons-material/Article';
import { USER } from '../constants/utilConstants';
import { useDispatch, useSelector } from 'react-redux';
import { fecthElements, validate_Element } from '../actions/element';
import secureLocalStorage from 'react-secure-storage';
import { fetchNotes, saveBrouillon, validateNote } from '../actions/note';
import DataTable from './DataTable';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ListBrouillons from './ListBrouillons';
import FormNote from './FormNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Swal from 'sweetalert2';
import { validate_Module } from '../actions/module';
import { useNavigate } from 'react-router-dom';
import { NOT_FOUND_RESSOURCE } from '../constants/routesConstants';
import { add_Notification } from '../actions/Notification';
import { useReactToPrint } from 'react-to-print'
import '../App.css'
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

function TabNavigationNotes() {
    const reportTemplateRef = useRef(null);  // pour printer les notes

    const handlePrint = useReactToPrint({
        content: () => reportTemplateRef.current,
        documentTitle: "document",

    });

    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0)
    const [elementState, setElementState] = useState('')
    const theme = useTheme();
    const [editBrouillon, setEditingBrouillon] = useState(false)

    const dispatch = useDispatch()
    const user = secureLocalStorage.getItem(USER)
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(fecthElements())
        dispatch(fetchNotes())
    }, [dispatch])


    //************************ Initialisation des variables ***************************************************************** */
    const elements = useSelector(state => state.adminReducers.elements)
    const notes = useSelector(state => state.professeurReducers.notes)
    const elementsFilter = elements.filter((e) => e.professeur.code === user?.idProf)
    const notesFilterParElement = (elementID) => notes.filter((n) => n.element.id === elementID) //selon id recupere select drop menu  utile dans la methode suivante modalitesUniqueFilter

    const modalitesUniqueFilter = (elementID) => { // utile pour initialiser stepper
        const modalitesFilter = notesFilterParElement(elementID).map((n) => { return n.modalite })

        let uniqueModalites = modalitesFilter.filter((ele, ind) => ind === modalitesFilter.findIndex(elem => elem.id === ele.id)) // remove dupliquated modalites (par index) return table modalites
        return uniqueModalites;
    }
    const [modaliteState, setModaliteState] = useState(!elementState ? null : modalitesUniqueFilter(+elementState))

    const notesPerModaliteAndElement = (elementID, modaliteID) => { // pour remplir chaque table d'etudiant selon element et modalite
        return notesFilterParElement(elementID).filter((n) => { return n.modalite.id === modaliteID })
    }

    const findModuleByelement = (elementID) => {
        return notesFilterParElement(elementID)[0] ? "Module : " + notesFilterParElement(elementID)[0].element.module.nom : ""

    }

    const ModuleIsValid = (elementID) => {
        return notesFilterParElement(elementID)[0].element.module.isValid

    }

    const elementIsValid = (elementID) => {

        let var_elt = elements.find((e) => e.id === elementID);
        return var_elt.isValid;

    }

    const notesFilterParElementAndEtudiant = (elementID, etudiantID) => {
        const noteList = notesFilterParElement(+elementID);
        return noteList.filter((n) => { return n.etudiant.code === etudiantID })

    }
    //*********************************************************************************************************************************** */


    const handleChangeElement = (e) => {
        if (!notesFilterParElement(+e.target.value)[0]) navigate(NOT_FOUND_RESSOURCE)
        // on veut lorsque on choisit element premiere modalite va etre selectionne pour filter le tableau etudiants
        setElementState(e.target.value)
        setModaliteState(modalitesUniqueFilter(+e.target.value)[0].id)
    }

    //**************************form note***************************** */
    const initialState = { note: '', isAbscent: 'false' }
    const [currentId, setCurrentId] = useState(0)
    const [errorNote, setErrorNote] = useState("")
    const [formDataNote, setFormDataNote] = useState(initialState)
    const handleChangeFormNote = (e) => {

        setFormDataNote({ ...formDataNote, [e.target.name]: e.target.value })

    }
    const handleValidateNote = (event) => {
        event.preventDefault();
        console.log(formDataNote)
        console.log(currentId)
        if (formDataNote.isAbscent === 'false') {
            if (+formDataNote.note < 0 || +formDataNote.note > 20) { setErrorNote("note doit etre ente 0 et 20"); }
            else if (isNaN(formDataNote.note)) { setErrorNote("note est invalide"); }
            else if (formDataNote.note.length === 0) { setErrorNote("note doit etre saisie"); }
            else {
                dispatch(validateNote({ idNote: currentId, valeur: +formDataNote.note, abscent: formDataNote.isAbscent === "false" ? false : true }))
                clear()
            }
        }
        else {

            dispatch(validateNote({ idNote: currentId, valeur: 0, abscent: formDataNote.isAbscent === "false" ? false : true }))
            clear()
        }
    };

    const handleSaveBrouillon = (event) => {
        event.preventDefault();

        if (formDataNote.isAbscent === 'false') {
            if (+formDataNote.note < 0 || +formDataNote.note > 20) { setErrorNote("note doit etre ente 0 et 20"); }
            else if (isNaN(formDataNote.note)) { setErrorNote("note est invalide"); }
            else if (formDataNote.note.length === 0) { setErrorNote("note doit etre saisie"); }
            else {
                dispatch(saveBrouillon({ idNote: currentId, valeurBrouillon: +formDataNote.note, abscentBrouillon: formDataNote.isAbscent === "false" ? false : true }))
                clear()
            }
        }
        else {

            dispatch(validateNote({ idNote: currentId, valeurBrouillon: 0, abscentBrouillon: formDataNote.isAbscent === "false" ? false : true }))
            clear()
        }
    };


    const clear = () => {

        setErrorNote("")
        setCurrentId(0)
        setEditingBrouillon(false)
        setFormDataNote({ ...formDataNote, note: '', isAbscent: 'false' });
    };

    // const [Validate_Module_State,should_Validate_Module] = useState(false) ; // ce variable est indicateur pour appeler shouldValidateModule 

    const validateElement = (e) => {
        e.preventDefault();
        let var_elt = elements.find((e) => e.id === +elementState); // utile pour construction du message de notification

        const noteList = notesFilterParElement(+elementState);
        var autoriseValidation = true;
        for (let i = 0; i < noteList.length; i++) {
            if (!noteList[i].valid) {
                autoriseValidation = false;
                break;
            }
        }
        if (!autoriseValidation) {
            Swal.fire({
                icon: 'error',
                title: "Pas d'autorisation pour la validation",
                text: 'Veuillez saisir tous les notes',
                footer: 'Il y a des notes qui ne sont pas valides ! '
            })
        }
        else {
            var confirmValidation = false;
            for (let j = 0; j < noteList.length; j++) {
                if (noteList[j].valeur === 0 || noteList[j].valeur === 20) {
                    confirmValidation = true;
                    break;
                }
            }

            if (confirmValidation) {

                Swal.fire({
                    title: 'Vous etes sure?',
                    text: "Vous ne pourrez pas revenir en arrière!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, valide les notes!',
                    footer: 'Il y a des notes egale a 0 ou 20 !! '
                }).then((result) => {
                    if (result.isConfirmed) {

                        dispatch(validate_Element(+elementState))
                        dispatch(add_Notification({ message: `l'element ${var_elt?.nom} a ete valide par ${user?.userName} ` }))
                        Swal.fire(
                            'valide!',
                            'les notes sont validates.',
                            'success'
                        )
                        shouldValidateModule()

                    }
                })
            }

            else {

                dispatch(validate_Element(+elementState))
                Swal.fire(
                    'valide!',
                    'les notes sont validates.',
                    'success'
                )
                dispatch(add_Notification({ message: `l'element ${var_elt?.nom} a ete valide par ${user?.userName} ` }))
                shouldValidateModule()
            }

        }



    }


    ////!! !! !! !  !! logique fait  dans backend  
    const shouldValidateModule = () => {
        const findModule = notesFilterParElement(+elementState)[0].element.module;
        // const elementsOfModules = elements.filter(e => e.module.id === findModule.id);

        // console.log(elementsOfModules)
        // var willValidateModule = true;
        // for (let i = 0; i < elementsOfModules.length; i++) {
        //     if (!elementsOfModules[i].isValid) {
        //         willValidateModule = false;
        //         break;
        //     }

        // }

        // if (willValidateModule) {
        dispatch(validate_Module(findModule.id))

        // }
    }

    // Moyenne de l'element
    const calculateMoyenne = (elementID, etudiantID) => {
        const noteListOfEtudiant = notesFilterParElementAndEtudiant(elementID, etudiantID);

        var moyenne = 0;
        for (let i = 0; i < noteListOfEtudiant.length; i++) {
            moyenne += noteListOfEtudiant[i].valeur * noteListOfEtudiant[i].modalite?.coefficient
        }
        return moyenne.toFixed(2);
    }

    const calculateMoyenneModule = (elementID, etudiantID) => {
        const findModule = notesFilterParElement(elementID)[0].element.module;
        const elementsOfModules = elements.filter(e => e.module.id === findModule.id);
        var moyenneModule = 0;
        for (let i = 0; i < elementsOfModules.length; i++) {
            moyenneModule += calculateMoyenne(elementsOfModules[i].id, etudiantID) * elementsOfModules[i].coefficient
        }
        return moyenneModule.toFixed(2);
    }


    const notdisplayForm = elementState ? elementIsValid(+elementState) : true
    //********************************* column definition ************************************************************** */
    const columns = [
        { field: 'idNote', headerName: 'idNote', width: 70, headerClassName: 'super-app-theme--header', hide: true },
        {
            field: 'etudiant',
            headerName: 'Nom',
            sortable: false,
            width: notdisplayForm ? 225 : 140,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return <Typography fontFamily="Nunito"> {params.row?.etudiant.nom} </Typography>
            }
        },
        {
            field: 'prenomEtudiant',
            headerName: 'Prenom',
            sortable: false,
            width: notdisplayForm ? 225 : 140,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return <Typography fontFamily="Nunito"> {params.row?.etudiant.prenom} </Typography>
            }
        },
        /*   {
               field: 'emailEtudiant',
               headerName: 'email',
               width: 255,
               headerClassName: 'super-app-theme--header',
               renderCell: (params) => {
                   return <Typography> {params.row.etudiant.email} </Typography>
               }
           },*/

        {
            field: 'brouillon',
            headerName: 'Dans Brouillon',
            width: 130,
            hide: notdisplayForm,
            headerClassName: 'super-app-theme--header',
            align: 'center',
            renderCell: (params) => {
                return <Typography > {params.row?.brouillon ? "✔" : "✖"} </Typography>
            }

        },

        {
            field: 'abscent',
            headerName: 'Abscent',
            width: notdisplayForm ? 200 : 100,

            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return <Typography fontFamily="Nunito"> {params.row?.abscent ? "Oui" : "Non"} </Typography>
            }

        },

        {
            field: 'valeur',
            headerName: 'Note',
            width: notdisplayForm ? 200 : 90,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return <Typography fontFamily="Nunito"> {params.row?.valeur ? params.row.valeur : 0} </Typography>

            }

        },

        {
            field: 'moyenne',
            headerName: 'Moyenne Element',
            sortable: false,
            hide: elementState ? !elementIsValid(+elementState) : false, // si element valid --> hide : false
            width: notdisplayForm ? 220 : 90,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return <Typography fontFamily="Nunito"> {elementIsValid(+elementState) ? calculateMoyenne(params.row?.element.id, params.row?.etudiant.code) : "****"} </Typography>

            }

        },

        {
            field: 'moyenne_module',
            headerName: 'Moyenne Module',
            sortable: false,
            hide: elementState ? !ModuleIsValid(+elementState) && !notdisplayForm : false, // si module valid --> hide : false
            width: notdisplayForm ? 223 : 90,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return <Typography fontFamily="Nunito"> {ModuleIsValid(+elementState) ? calculateMoyenneModule(params.row?.element.id, params.row?.etudiant.code) : "****"} </Typography>

            }

        },
        {
            field: 'valid',
            headerName: 'Valide',
            width: 90,
            hide: notdisplayForm,
            headerClassName: 'super-app-theme--header',
            align: 'center',
            renderCell: (params) => {
                return <Typography > {params.row?.valid ? "✔" : "✖"} </Typography>
            }

        },

        {
            field: 'Actions', headerName: 'Actions', width: notdisplayForm ? 260 : 155, sortable: false,
            headerClassName: 'super-app-theme--header',
            hide: elementState ? elementIsValid(+elementState) : true,
            renderCell: (params) => {
                return <div >
                    <Button disabled={elementState ? elementIsValid(+elementState) : false} variant='contained' color='warning' sx={{ mr: 2 }} onClick={(e) => { e.preventDefault(); setCurrentId(params.row.idNote) }}  >  <ModeEditOutlineIcon /></Button>
                </div>;
            }

        },


    ];


    return (
        <div >
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="gestion des notes">
                        <Tab icon={<ArticleIcon fontSize='large' />} label="Notes" sx={{ minWidth: "50%", fontFamily: 'Laila', fontWeight: 'bold' }} />
                        <Tab icon={<RestorePageIcon fontSize='large' />} label="Brouillons" sx={{ minWidth: "50%", fontFamily: 'Laila', fontWeight: 'bold' }} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} >

                    <Paper elevation={5} sx={{ p: 2.5 }}>
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <p style={{ fontFamily: "Nunito", fontWeight: "bold", marginRight: 5 }}>{findModuleByelement(+elementState)} </p>
                                    {
                                        elementState ? (
                                            <p> {ModuleIsValid(+elementState) ? (
                                                <Tooltip title="Module est valide" arrow={true}>
                                                    <CheckCircleIcon color='success' />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Module n'est pas valide" arrow={true}>
                                                    <CancelIcon color='error' />
                                                </Tooltip>

                                            )
                                            } </p>
                                        )
                                            : ""
                                    }

                                </div>
                                {
                                    elementState ? (
                                        <p style={{ fontFamily: "Nunito", fontWeight: "bold" }}>{elementIsValid(+elementState) ? (
                                            <Button variant='contained' sx={{ fontFamily: "Montserrat" }} startIcon={<FileDownloadIcon />} onClick={handlePrint} >telecharger les notes</Button>
                                        ) : (
                                            <Button variant='contained' sx={{ fontFamily: "Montserrat" }} startIcon={<CheckCircleIcon />} onClick={validateElement}>Valider l'element</Button>
                                        )} </p>
                                    )
                                        : ""
                                }
                            </Box>
                            <Box sx={{
                                width: "40%", margin: "auto", mb: 3, [theme.breakpoints.down('md')]: {
                                    width: "80%"
                                },
                            }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Element</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={elementState}
                                        label="Select Element"
                                        onChange={handleChangeElement}
                                    >
                                        {
                                            elementsFilter.map((item) =>
                                                <MenuItem sx={{ fontFamily: "Nunito", color: "black" }} key={item.id} value={item.id}>{item.nom} </MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <StepperModalite steps={elementState ? modalitesUniqueFilter(+elementState) : []} setModaliteState={setModaliteState} activeStep={activeStep} setActiveStep={setActiveStep} />

                        <Grid container spacing={2} sx={{ mt: 5 }}>
                            {
                                !notdisplayForm ?
                                    (
                                        <>
                                            <Grid item xs={12} md={4}>
                                                <FormNote clear={clear} currentId={currentId} handleSaveBrouillon={handleSaveBrouillon} handleValidateNote={handleValidateNote} handleChange={handleChangeFormNote} formData={formDataNote} errorNote={errorNote}
                                                    setFormData={setFormDataNote} editBrouillon={editBrouillon} />
                                            </Grid>

                                            <Grid item xs={12} md={8}>
                                                <DataTable rows={notesPerModaliteAndElement(+elementState, modaliteState)} columns={columns} typeId='idNote' displayToolBar={false} bgColorHeader="#9c27b0" heightTable={371} pageSizeProps={5} />

                                            </Grid>

                                        </>
                                    )
                                    :

                                    <DataTable rows={notesPerModaliteAndElement(+elementState, modaliteState)} columns={columns} typeId='idNote' displayToolBar={false} bgColorHeader="#9c27b0" heightTable={371} pageSizeProps={5} />

                            }
                        </Grid>


                    </Paper>

                </TabPanel>



                <TabPanel value={value} index={1}>
                    <ListBrouillons notes={notes} setValue={setValue} setCurrentId={setCurrentId} setElementState={setElementState} setModaliteState={setModaliteState}
                        setActiveStep={setActiveStep} modalitesUniqueFilter={modalitesUniqueFilter} setEditingBrouillon={setEditingBrouillon} />

                </TabPanel>
            </Box>

            <div style={{ display: "none" }}>

                <table ref={reportTemplateRef} className="tableToPrint" >
                    <caption>Tableau des notes</caption>
                    <thead>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Modalite</th>
                        <th>Note</th>
                        <th>Abscent</th>
                    </thead>
                    <tbody>

                        {
                            notesFilterParElement(+elementState).map((note) => (
                                <tr key={note?.id}>
                                    <td>{note?.etudiant.nom}</td>
                                    <td>{note?.etudiant.prenom}</td>
                                    <td>{note?.modalite.nom}</td>
                                    <td>{note?.valeur.toFixed(2)}</td>
                                    <td>{note?.abscent ? "oui" : "non"}</td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default TabNavigationNotes