import { Avatar, Button, Divider, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function Profil({user_name, user_image,handleChange,formData}) {
    const [showUploadImage , setShowUploadImage] = useState(false)
  return (
    <Paper elevation={6} sx={{ borderRadius: 2, p: 2, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
    <Avatar sx={{ width: 104, height: 104,mb:2 }} alt="image profil" src={user_image}></Avatar>
    <Typography sx={{mb:2, fontFamily:"Montserrat",fontWeight:"bold"}} >{user_name}</Typography>
    <Divider variant="fullWidth" sx={{ width:"100%",mb:2,bgcolor:"black" }} />

     {
        showUploadImage ?(
            <TextField fullWidth name='image' required value={formData.image} onChange={handleChange} variant='outlined' label="url image" />

        ) :
        (
            <Button color='secondary' onClick={(e)=> setShowUploadImage(!showUploadImage)}>Upload image</Button>

        )
     }

</Paper>
  )
}

export default Profil