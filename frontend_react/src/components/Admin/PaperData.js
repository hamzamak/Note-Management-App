import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import '../../index.css'

function PaperData({ data, title, icon,background }) {
  return (
    <Paper  sx={{color : "white", display: 'flex', flexDirection: 'row', alignItems: 'center', p: 5, borderRadius: 2.5, justifyContent: "space-between",background }} elevation={5}>
      <Box  >
        <Typography variant='h5' sx={{ fontFamily: 'Nunito',mb:1 }}>{title}</Typography>
        <Typography sx={{ fontWeight: '500', fontFamily: 'Montserrat',fontSize:25 }}>{data}</Typography>
      </Box>
      {icon}
    </Paper>
  
  )
}

export default PaperData