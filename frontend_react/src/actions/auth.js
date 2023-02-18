import { AUTH } from '../constants/actionTypes';
import Swal from 'sweetalert2';
import * as api from '../api/index';


export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Login ou mot de passe est incorrecte',
    })

    console.log(error);
  }
};


export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Login ou mot de passe est incorrecte',
      footer: "mot de passe ou login oublie? contacter votre administrateur!",
    })

    console.log(error);
  }
};
