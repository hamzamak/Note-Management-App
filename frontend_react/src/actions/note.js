import { FETCH_NOTES, UPDATE_NOTE } from '../constants/actionTypes';
import * as api from '../api/index';


export const fetchNotes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchNotes();
    dispatch({ type: FETCH_NOTES,payload : data })
  } catch (error) {
    console.log(error);
  }
};


export const validateNote = (formData) => async (dispatch) => {
  try {
    const { data } = await api.validateNote(formData);
    dispatch({ type: UPDATE_NOTE,payload : data })
  } catch (error) {
    console.log(error);
  }
};

export const saveBrouillon = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveBrouillon(formData);
    dispatch({ type: UPDATE_NOTE,payload : data })
  } catch (error) {
    console.log(error);
  }
};

export const deleteBrouillon = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteBrouillon(formData);
    dispatch({ type: UPDATE_NOTE,payload : data })
  } catch (error) {
    console.log(error);
  }
};