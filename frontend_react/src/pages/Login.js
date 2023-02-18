import React, { useEffect, useState } from 'react';
import './login.css'
import { useTheme } from '@mui/material/styles';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
//import Background from '../images/img-01.webp';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../actions/auth';
import { USER } from '../constants/utilConstants';
import secureLocalStorage from 'react-secure-storage';
import ensaLogo from '../images/ensaLogo.png'
function Login() {
  const theme = useTheme();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialState = { login: '', password: '' };
  const [formData, setFormData] = useState(initialState)
  const [errorLogin , setErrorLogin] = useState("")
  const [errorPassword , setErrorPassword] = useState("")

  const [isSignUp,setIsSigneUp]= useState(false)
  const user = secureLocalStorage.getItem(USER)
  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value })

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData)
    if(formData.login.length === 0) {setErrorLogin("login doit etre mentione"); setErrorPassword("")}
    else if(formData.password.length === 0) {setErrorPassword("password doit etre mentione") ; setErrorLogin("") }
   // console.log(formData)
   else {
    if(isSignUp){
      dispatch(signup(formData, navigate))
    }
    else {
      dispatch(signin(formData, navigate))

    }
    setErrorPassword("")
    setErrorLogin("")
   }
   

  };

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  return (
    <Container maxWidth="xl">

      <Container className="my-5 gradient-form">
        <Paper elevation={8} sx={{ borderRadius: 5, p: 3 }}>

          <Grid container columnSpacing={9}>

            <Grid item col='6' className="mb-5" xs={12} md={6}>
              <Container   >

                <div className="text-center">
                  <img src={ensaLogo}
                    style={{ width: '200px' }} alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1" style={{fontFamily:"Montserrat"}}>Ensa Khouribga</h4>
                </div>

                <p style={{ textAlign: 'center', fontFamily: "Nunito" }}>Member Login</p>


                <TextField variant='outlined' color='error'  label='Login'  type='text' name='login' value={formData.login} onChange={handleChange} fullWidth margin='dense' helperText={errorLogin} error={errorLogin ? true : false}/>
                <TextField variant='outlined' label='Password' color='error' name='password' type='password' value={formData.password} onChange={handleChange} fullWidth margin='dense' helperText={errorPassword} error={errorPassword ? true : false} />

                <Button variant='outlined' color='secondary' onClick={(e)=>setIsSigneUp(!isSignUp)} sx={{fontFamily: "Nunito",fontSize:12,mt:1,mb:1}}> {!isSignUp ? "Vous avez login? Sign Up": "Vous avez deja un compte? Sign in"}</Button>

                <div className="text-center pt-1 mb-5 pb-1">
                  <Button className="mb-4 w-100 gradient-custom-2" sx={{ color: "white", fontFamily: "Nunito" }} onClick={handleSubmit}> {isSignUp ? "Sign up" : "Sign in"}</Button>

                </div>


              </Container>

            </Grid>

            <Grid item col='6' className="mb-5" sx={{
              [theme.breakpoints.down('md')]: {
                display: "none"
              }
            }} xs={12} md={6}>
              <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4 column2">

                <div className="text-white px-3 py-4 p-md-5 mx-md-4" >
                  <h4 className="mb-4">École Nationale des Sciences Appliquées de Khouribga</h4>

                  <p className="small mb-0" style={{fontFamily:"Montserrat"}}>L'École nationale des sciences appliquées de Khouribga, est une 
                  école d'ingénieurs publique relevant de l'Université Sultan Moulay Slimane de Béni Mellal. Elle a été créée en 2007 pour appuyer la volonté gouvernementale dans le cadre de l’initiative nationale de formation de 10 000 ingénieurs à l’horizon 2010
                  </p>
                </div>

              </div>

            </Grid>

          </Grid>

        </Paper>
      </Container>
    </Container>
  );
}

export default Login;