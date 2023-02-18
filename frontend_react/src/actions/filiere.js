
import Swal from 'sweetalert2';
import * as api from '../api/index.js';
import { END_LOADING, START_LOADING,FETCH_FILIERES } from '../constants/actionTypes.js';



export const fecthFilieres = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fecthFilieres();
    dispatch({ type: FETCH_FILIERES, payload: data });
   // console.log(data)
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
