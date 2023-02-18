import * as api from '../api/index.js';
import { ADD_NOTIFICATION, DELETE_NOTIFICATION, END_LOADING, FETCH_NOTIFICATIONS, START_LOADING } from '../constants/actionTypes.js';

export const fetch_Notification = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchNotification();
    dispatch({ type: FETCH_NOTIFICATIONS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_Notification = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.removeNotification(id);
      dispatch({ type: DELETE_NOTIFICATION, payload: data });
      
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };

  
  export const add_Notification = (formData) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.addNotification(formData);
      dispatch({ type: ADD_NOTIFICATION, payload: data });
     
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };
  
