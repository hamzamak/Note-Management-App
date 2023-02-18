import React, {  } from 'react'
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
function UpdateProfil({formData,handleChange,errorPassword, errorLogin, handleSubmit, error_rePassword, errorUserName}) {
  return (
    <Paper elevation={6} sx={{ borderRadius: 2,pt:4, display: "flex", flexDirection: "column"}}>
    <Box sx={{paddingInline : 4}}>
        <Typography variant='h6' sx={{mb:0.5, fontFamily:"Montserrat",fontWeight:"bold"}}>Profile</Typography>
        <Typography variant='subtitle1' sx={{mb:4, fontFamily:"Montserrat"}}>The information can be edited</Typography>
    </Box>
    <Divider variant="fullWidth" sx={{ width:"100%",mb:4,bgcolor:"gray" }} />

    <Grid container spacing={3} columnSpacing={8} sx={{mb:4,paddingInline : 4}}>
        <Grid item xs={12} md={12} lg={6}>
            <TextField fullWidth  variant='outlined' label="username" required sx={{borderRadius: 88888,}}  name='userName' value={formData.userName} onChange={handleChange} helperText={errorUserName} error={errorUserName ? true : false} />
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
            <TextField fullWidth name='login' required value={formData.login} onChange={handleChange} variant='outlined' label="login" helperText={errorLogin} error={errorLogin ? true : false}/>
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
            <TextField fullWidth name='password' required value={formData.password} onChange={handleChange} variant='outlined' label="password" helperText={errorPassword} error={errorPassword ? true : false} />
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
            <TextField fullWidth name='repassword' required value={formData.repassword} onChange={handleChange} label="re-password" helperText={error_rePassword} error={error_rePassword ? true : false} />
        </Grid>
    </Grid>
    <Divider variant="fullWidth" sx={{ width:"100%",bgcolor:"gray" }}/>
    <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "flex-end",p :3 }} >
    <Button variant='contained' color='success' sx={{alignItems:"flex-end",textAlign:"left",width:200,fontFamily:"Montserrat"}} onClick={handleSubmit}>Save Details</Button>

    </Box>
</Paper>
  )
}

export default UpdateProfil