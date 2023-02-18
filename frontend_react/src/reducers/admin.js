import secureLocalStorage from 'react-secure-storage';
import { START_LOADING, END_LOADING, FETCH_TEACHERS, FETCH_COMPTES, ADD_COMPTE, UPDATE_COMPTE, DELETE_COMPTE, FETCH_FILIERES, FETCH_MODULES, FETCH_ELEMENTS, UPDATE_ELEMENTS_TO_PROF, FETCH_STUDENTS, FETCH_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, VALIDATE_ELEMENT, VALIDATE_MODULE, FETCH_NOTIFICATIONS, ADD_NOTIFICATION, DELETE_NOTIFICATION } from '../constants/actionTypes';
import { USER } from '../constants/utilConstants';

const adminReducers = (state = { isLoading: false, teachers: [], comptes: [], filieres: [], modules: [], elements: [], students: [], todoList: [],notifications : [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_TEACHERS:
      return {
        ...state,
        teachers: action.payload,

      }

    case FETCH_COMPTES:
      return {
        ...state,
        comptes: action.payload,

      }
    case ADD_COMPTE:

      return { ...state, comptes: [...state.comptes, action?.payload] };


    case UPDATE_COMPTE:
      var user = secureLocalStorage.getItem(USER);
      secureLocalStorage.removeItem(USER);
      user.userName = action.payload.userName;
      user.login = action.payload.login;
      user.image = action.payload.image;
      secureLocalStorage.setItem(USER, user);
      return {
        ...state,
        comptes: state.comptes.map((c) => (c.id === action.payload.id ? action.payload : c)),
      }

    case DELETE_COMPTE:
      return {
        ...state, comptes: state.comptes.filter((c) => c.id !== action.payload)
      }

    case FETCH_FILIERES:
      return {
        ...state,
        filieres: action.payload,

      }

    case FETCH_MODULES:
      return {
        ...state,
        modules: action.payload,

      }

    //action du professeur
    case VALIDATE_MODULE:
      //find elementsbymodule 
     // console.log(state.elements)
    //   const elementsOfModule = state.elements.filter((elem) => elem.module.id === action.payload.id)
    //  // console.log(elementsOfModule)
    //   elementsOfModule.map((item)=> item.module = action.payload)
    //   console.log(elementsOfModule)
    //   const updatedElements = state.elements ;
    //  for(let i = 0 ; i < elementsOfModule.length ; i ++){
    //   updatedElements.splice( state.elements.findIndex((e)=> e.id === elementsOfModule[i].id), 1, elementsOfModule[i]); //splice(start, deleteCount, item1)
    //  }
    //   console.log(updatedElements)
      return {
        ...state,
        modules: state.modules.map((m) => (m.id === action.payload.id ? action.payload : m)),
       // elements : updatedElements
      }

    case FETCH_ELEMENTS:
      return {
        ...state,
        elements: action.payload,

      }
    case UPDATE_ELEMENTS_TO_PROF:

      const prof = state.teachers.find((t) => (t.code === action.payload.idProfesseur))
      let updatedElement = state.elements.find((e) => e.id === action.payload.idElement);
      updatedElement.professeur = prof
      return {
        ...state, elements: state.elements.map((e) => (e.id === +action.payload.idElement ? updatedElement : e)),
      }

    //professeur action
    case VALIDATE_ELEMENT:
      return { ...state, elements: state.elements.map((e) => (e.id === action.payload.id ? action?.payload : e)) };


    case FETCH_STUDENTS:
      return {
        ...state,
        students: action.payload,

      }


    case FETCH_TODOS:
      return {
        ...state,
        todoList: action.payload,

      }

    case ADD_TODO:
      return { ...state, todoList: [...state.todoList, action?.payload] };

    case DELETE_TODO:
      return {
        ...state, todoList: state.todoList.filter((t) => t.id !== action.payload)
      }

    case UPDATE_TODO:
      return { ...state, todoList: state.todoList.map((todo) => (todo.id === action.payload.id ? action?.payload : todo)) };
   
   
      case FETCH_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload,
  
        }
      case ADD_NOTIFICATION:
  
        return { ...state, notifications: [...state.notifications, action?.payload] };
      
    case DELETE_NOTIFICATION:
      return {
        ...state, notifications: state.notifications.filter((c) => c.id !== action.payload)
      }
    default:
      return state;
  }
};

export default adminReducers