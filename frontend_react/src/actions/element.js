
import * as api from '../api/index.js';
import { END_LOADING, START_LOADING,FETCH_ELEMENTS ,UPDATE_ELEMENTS_TO_PROF,VALIDATE_ELEMENT } from '../constants/actionTypes.js';



export const fecthElements = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fecthElements();
    dispatch({ type: FETCH_ELEMENTS, payload: data });
 //   console.log(data)
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateElementsToTeacher = (data) => async (dispatch) => {
  try {
   
    await api.updateElementsToTeacher(data);
    dispatch({ type: UPDATE_ELEMENTS_TO_PROF, payload: data });
 
  } catch (error) {
    console.log(error.message);
  }
};

export const validate_Element = (id) => async (dispatch) => {
  try {
   
    const { data } = await api.validateElement(id);
    dispatch({ type: VALIDATE_ELEMENT, payload: data });
 
  } catch (error) {
    console.log(error.message);
  }
};