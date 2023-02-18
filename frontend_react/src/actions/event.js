import * as api from '../api/index.js';
import { ADD_EVENT, DELETE_EVENT, END_LOADING, FETCH_EVENTS, START_LOADING } from '../constants/actionTypes.js';

export const fetch_Events = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchEvents(id);
    dispatch({ type: FETCH_EVENTS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_Event = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.removeEvent(id);
      dispatch({ type: DELETE_EVENT, payload: data });
      
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };

  
  export const add_Event = (formData) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.addEvent(formData);
      dispatch({ type: ADD_EVENT, payload: data });
     
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };
  
