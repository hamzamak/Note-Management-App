import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';


function FormNote({ formData, handleChange, errorNote, clear, handleValidateNote,handleSaveBrouillon, currentId, setFormData,editBrouillon }) {
    const note = useSelector(state => (currentId ? state.professeurReducers.notes.find((n) => n.idNote === currentId) : null));
    useEffect(() => {
        if (note) 
           if(!editBrouillon) setFormData({ ...formData, note: note.valeur, isAbscent: note.abscent.toString() });

           else setFormData({ ...formData, note: note.valeurBrouillon, isAbscent: note.abscentBrouillon.toString() });
    }, [note]);
    return (
        <Paper elevation={8} sx={{ borderRadius: 2, p: 3 }} >

            <form autoComplete="off" noValidate   >
                <Typography sx={{ textAlign: "center", fontFamily: "Nunito" }} variant="h6">Editing note  {currentId ? "du "+ note?.etudiant?.prenom: ""} </Typography>

                <TextField  name="note" variant="outlined" required label="note" fullWidth value={formData.note} onChange={handleChange} margin="dense" helperText={errorNote} disabled={formData.isAbscent==='true' ?true : false} error={errorNote ? true : false} sx={{ mb: 2 }} />
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Status de l'abscence</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="role-radio-buttons-group-label"
                        name="isAbscent"
                        value={formData.isAbscent}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Oui" />
                        <FormControlLabel value="false" control={<Radio />} label="Non" />
                    </RadioGroup>
                </FormControl>
                <Grid container spacing={2} mt={0.2} >
                    <Grid item xs={12} md={6}>
                        <Button variant="contained" color="success"  size="medium" fullWidth endIcon={<EditIcon fontSize="inherit" />} onClick={handleValidateNote} disabled={currentId ? false : true}>Valider</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button variant="contained" color="secondary" size="medium" onClick={clear} fullWidth endIcon={<CachedIcon fontSize="inherit" />} >Annuler</Button>
                    </Grid>

                </Grid>
                <Button variant="contained" color="primary" sx={{ mt:1.5,mb : 1,}} size="medium" fullWidth endIcon={<EditIcon fontSize="inherit" />} onClick={handleSaveBrouillon} disabled={currentId ? false : true}>Enregistrer dans brouillon</Button>
            </form>
        </Paper>
    )
}

export default FormNote