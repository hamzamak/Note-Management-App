
import Swal from 'sweetalert2';
import * as api from '../api/index.js';
import { END_LOADING, FETCH_COMPTES, START_LOADING, UPDATE_COMPTE, ADD_COMPTE, DELETE_COMPTE } from '../constants/actionTypes.js';
import emailjs from '@emailjs/browser';
import { USER } from '../constants/utilConstants.js';
import secureLocalStorage from 'react-secure-storage';

export const fetchComptes = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchComptes();
    dispatch({ type: FETCH_COMPTES, payload: data });
    // console.log(data)
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}

export const addCompte = ({ login, password, professeur, sendEmail }) => async (dispatch) => {
  try {
    const user = secureLocalStorage.getItem(USER)
    dispatch({ type: START_LOADING });
    const { data } = await api.addCompte({ login, password, professeur });
    dispatch({ type: ADD_COMPTE, payload: data });
    //console.log(data)
    dispatch({ type: END_LOADING });
    if (sendEmail) {
      var templateParams = {
        //  from_email: user?.login, // Changes From Email field are not available for Personal Services. ici j'utilise gmail pour test
        from_name: user?.userName,
        to_email: data?.professeur.email,
        login: data?.login,
        to_name: data?.userName
      }

      emailjs.send("service_o9ldihl", "template_4z9zmsr", templateParams, "3ucdTMutZLIGYujBt")
        .then((response) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,


            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: "L'email est bien envoye",

          })
        }, (err) => {
          Swal.fire({
            title: "Oups ! une erreur est apparue lors du l'envoie du email ",
            icon: 'error',
            footer: "Le probleme peut etre due de l'adresse email du recepteur",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }

          })
        });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Login deja existe',

    })
  }
}

export const updateCompte = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateCompte(formData);
    dispatch({ type: UPDATE_COMPTE, payload: data });
    // console.log(data)
    dispatch({ type: END_LOADING });
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,


      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: "le compte a ete edite !",

    })
    alert("reload page !!")
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Essayer un autre Login !!',

    })
  }
}

export const deleteCompte = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.deleteCompte(id);
    dispatch({ type: DELETE_COMPTE, payload: data });
    // console.log(data)
    dispatch({ type: END_LOADING });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'erreur  !!',

    })
  }
}