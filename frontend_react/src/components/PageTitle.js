import { Box, Typography } from '@mui/material'
import React from 'react'

function PageTitle({title,icon,iconBackgroundColor,boxWidth=125}) {
  return (
    <Box sx={{ width: boxWidth, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBlock: 2,  justifyContent: "space-between"}} >
     <Box  sx={{background:iconBackgroundColor ,color:'white',
    width: 36,
    mr:1,
    p:0.4,
    borderRadius: 1,
    textAlign: "center"}}>
     {icon}
     </Box>
      <Typography sx={{ fontWeight: 'bold', fontFamily: 'Nunito' }}>{title}</Typography>
  </Box>
  )
}

export default PageTitle