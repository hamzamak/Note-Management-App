import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar.js';
import { ACCOUNT, AUTH_ROUTE, COMPTE, GESTIONS, HOME, STUDENT, TEACHER } from './constants/routesConstants.js';
import Account from './pages/Account.js';
import Compte from './pages/Compte.js';
import NotFoundPage from './pages/ErrorPage.js';
import GestionElements from './pages/GestionElements.js';
import GestionNotes from './pages/GestionNotes.js';
import Home from './pages/Home.js'
import Login from './pages/Login.js';
import TeacherBoard from './pages/TeacherBoard.js';
import './App.css'
function App() { 
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path={AUTH_ROUTE} exact element={ <Login/> }/> 
          <Route path='/' element={<Navigate /*replace*/ to={HOME} />} />
          <Route path={HOME} element={<><SideBar /><Home/></>} />
          <Route path={TEACHER} element={<><SideBar /><TeacherBoard/></> } />
          <Route path={STUDENT} element={<><SideBar /><GestionNotes /></>} />
          <Route path={COMPTE} element={<><SideBar /><Compte /></>} />
          <Route path={GESTIONS} element={<><SideBar /><GestionElements /></>} />
          <Route path={ACCOUNT} element={<><SideBar /><Account /></>} />
          <Route path="*"  element={<NotFoundPage/>} />
        </Routes>
        <div style={{marginBottom : 20}}></div>
      </BrowserRouter>
    </>


  );
}

export default App;
