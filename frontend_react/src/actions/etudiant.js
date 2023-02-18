import * as api from '../api/index.js';
import { END_LOADING, FETCH_STUDENTS, START_LOADING } from '../constants/actionTypes.js';

export const fetchStudents = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchStudents();
    dispatch({ type: FETCH_STUDENTS, payload: data });
   
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
