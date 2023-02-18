
import * as api from '../api/index.js';
import { END_LOADING, START_LOADING,FETCH_MODULES,VALIDATE_MODULE } from '../constants/actionTypes.js';
import { fetchNotes } from './note.js';
import { add_Notification } from './Notification.js';

export const fecthModules = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fecthModules();
    dispatch({ type: FETCH_MODULES, payload: data });
  
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};


export const validate_Module = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.validateModule(id);
    dispatch({ type: VALIDATE_MODULE, payload: data });
   
    dispatch({ type: END_LOADING });
    dispatch(fetchNotes())
    dispatch(add_Notification({message: `le module  ${data?.nom} a ete valide a ete valide `}))
  } catch (error) {
    console.log("module cannot be validate yet , try to validte all his elements first");
  }
};