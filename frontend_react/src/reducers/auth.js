import { AUTH , LOGOUT} from '../constants/actionTypes';
import { USER } from '../constants/utilConstants';
import secureLocalStorage from 'react-secure-storage';
import decode from 'jwt-decode'
const authReducers = (state={authData : null} , action) => {
  switch (action.type) {
    case AUTH:
     // window.sessionStorage.setItem("key", "value");
      let token = action?.data
      const user = decode(token?.response)
     //  console.log(user)
      secureLocalStorage.setItem(USER, user);
       return {...state , authData : user}; 
    
       case LOGOUT:
        localStorage.clear();
        secureLocalStorage.clear()
         return {...state , authData : null };
        
    default:
      return state;
  }
};

export default authReducers
