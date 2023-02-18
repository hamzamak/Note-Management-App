import * as api from '../api/index.js';
import { END_LOADING, FETCH_TODOS, START_LOADING,ADD_TODO,DELETE_TODO, UPDATE_TODO} from '../constants/actionTypes.js';

export const fetchTodosByIdCompte = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchTodosByIdCompte(id);
    dispatch({ type: FETCH_TODOS, payload: data });
   
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}


export const add_Todo = (formData) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.addTodo(formData);
      dispatch({ type: ADD_TODO, payload: data });
       console.log(data)
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  }
  

  export const delete_Todo = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.deleteTodo(id);
      dispatch({ type: DELETE_TODO, payload: data });
       console.log(data)
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  }

  export const update_Todo = (formData) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.updateTodo(formData);
      dispatch({ type: UPDATE_TODO, payload: data });
       console.log(data)
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  }
