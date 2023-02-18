
import * as api from '../api/index.js';
import { END_LOADING, FETCH_TEACHERS, START_LOADING } from '../constants/actionTypes.js';

export const getAllTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchTeachers();
    dispatch({ type: FETCH_TEACHERS, payload: data });
   // console.log(data)
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

