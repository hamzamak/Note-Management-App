import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Container } from '@mui/material';



export default function StepperModalite({steps, setModaliteState,activeStep, setActiveStep}) {  //et passe tableau des notes pour chaque modalite
  const [completed, setCompleted] = React.useState(false);

  const handleStep = (step,item) => () => {
    setActiveStep(step);
    setModaliteState(item.id)
   console.log(step)
  };



  return (
    <Box sx={{ width: '80%' , margin:"auto", mb : 3  }}>
      <Stepper nonLinear activeStep={activeStep} >
        {steps.map((item, index) => (
          <Step key={item.id} completed={completed} sx={{margin:"auto"}} >
            <StepButton color="inherit" onClick={handleStep(index,item)} >
              {item.nom}
            </StepButton>
          </Step>
         
        ))}
      </Stepper>
      {/* <div>
        {children}
      </div> */}
    </Box>
  );
}