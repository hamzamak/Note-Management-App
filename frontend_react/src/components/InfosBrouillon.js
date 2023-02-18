import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
export default function InfosBrouillon({brouillons}) {
 const sortedWithDateBrouillon =  brouillons.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
  return (
    <Card sx={{ minWidth: 275, borderRadius :2 }} elevation={5}>
      <CardContent>
        <Typography sx={{  fontFamily : "Nunito" }} variant='subtitle2' color="text.secondary" gutterBottom>
         Informations generales sur  brouillon
        </Typography>

        {/* <Typography variant="h6" sx={{  fontFamily : "Nunito" }}  >
          Elements : <span style ={{fontFamily:'Nunito' , fontSize: '17px'}}>{tags.map((tag) => `#${tag} `)}</span>
        </Typography> */}
        <Typography variant="h6" sx={{  fontFamily : "Nunito" }} >
          Nombre des brouillons :<span style ={{fontFamily:'Nunito' , fontSize: '17px'}}>{brouillons.length}</span>
          <br />
        </Typography>
        {/* <Typography variant="h6" component="p" sx={{  fontFamily : "Nunito"  }} >
         date recente  : <span style ={{fontFamily:'Nunito' , fontSize: '15px'}}>{moment(brouillons[brouillons.length -1]?.createdAtBrouillon).format('DD MMM YYYY, h:mm:ss a')}</span>
        </Typography> */}
      </CardContent>
    </Card>
  );
}
