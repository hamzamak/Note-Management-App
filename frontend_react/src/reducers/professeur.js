import { START_LOADING, END_LOADING, FETCH_NOTES, UPDATE_NOTE, FETCH_EVENTS, ADD_EVENT, DELETE_EVENT } from '../constants/actionTypes';
//events pour prof et admin 
const professeurReducers = (state = { isLoading: false, notes: [], events: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_NOTES:
      return {
        ...state,
        notes: action.payload,
      }

    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => (note.idNote === action.payload.idNote ? action?.payload : note))
      }


    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload,

      }
    case ADD_EVENT:

      return { ...state, events: [...state.events, action?.payload] };

    case DELETE_EVENT:
      return {
        ...state, events: state.events.filter((e) => e.id !== action.payload)
      }

    default:
      return state;
  }
};

export default professeurReducers