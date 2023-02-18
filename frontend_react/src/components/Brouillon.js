import { Avatar, Container, IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import moment from 'moment';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch } from 'react-redux';
import { deleteBrouillon } from '../actions/note';
function Brouillon({item,setValue, setCurrentId, setElementState, setModaliteState,setActiveStep,modalitesUniqueFilter,setEditingBrouillon}) {
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteBrouillon( item?.idNote))
    };

    const traiterBrouillon= ()=> {
        setValue(0)
        setEditingBrouillon(true)
        setElementState(item?.element?.id)
        setModaliteState(item?.modalite?.id)
        const array_modalite_unique = modalitesUniqueFilter(item?.element?.id)
        setActiveStep(array_modalite_unique.findIndex(elt=> elt?.id === item?.modalite?.id ))
        setCurrentId( item?.idNote)


    }
  return (
    <Container sx={{
        justifyContent: 'space-between', display: 'flex', alignItems: "center", background: "#edf1f7", padding: 2,
        borderRadius: 3, mt: 2
    }}  >
        <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: "center", cursor: 'pointer' }} onClick={traiterBrouillon}>
            <Avatar sx={{ bgcolor: "green", marginRight: 3 }}>
                <DescriptionOutlinedIcon />
            </Avatar>
            <Box>
                <Typography sx={{ wordBreak: 'break-word',fontFamily:"Nunito" }}><strong>Element :</strong>  {item?.element?.nom } </Typography>
                <Typography sx={{ wordBreak: 'break-word',fontFamily:"Nunito" }}> Modalite :<strong> {item?.modalite?.nom }</strong> </Typography>
                <Typography variant='subtitle2' sx={{ wordBreak: 'break-word',fontFamily:"Nunito" }}><strong>Etudiant </strong>: {item?.etudiant?.nom+ " "+ item?.etudiant?.prenom } </Typography>
                <Typography variant='subtitle2' sx={{ wordBreak: 'break-word',fontFamily:"Nunito" }}>  Note : <strong> {item?.valeurBrouillon} </strong> ({item?.abscentBrouillon ? "abscent" : "pas abscent"}) </Typography>
                <Typography variant='subtitle2' sx={{ wordBreak: 'break-word',fontFamily:"Nunito" }}>{moment(item?.createdAtBrouillon).format('DD MMM YYYY, h:mm:ss a')}</Typography>
            </Box>

        </div>
        <Tooltip title="supprimer ce brouillon" arrow>
            <IconButton onClick={handleDelete}>
                <RemoveCircleIcon color='error'/>
            </IconButton>
        </Tooltip>
    </Container>
  )
}

export default Brouillon