import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' })

// API.interceptors.request.use((req)=> {
//     if(localStorage.getItem('profile'))  {
//          req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
//     }
//     return req ;
// })


export const fetchTeachers = () => API.get(`/teacher/fetch_all`);


export const fetchComptes = () => API.get(`/compte/fetch_all`); 
export const addCompte = (formData) => API.post(`/compte/add`,formData); 
export const updateCompte = (formData) => API.put(`/compte/update`,formData); 
export const deleteCompte = (id) => API.delete(`/compte/delete/${id}`);


export const fecthFilieres = () => API.get(`/filiere/fetch_all`);  // fetchRoom by id room


export const fecthModules = () => API.get(`/module/fetch_all`);
export const validateModule = (id) => API.put(`/module/validateModule/${id}`);


 export const fecthElements = () => API.get(`/element/fetch_all`);
 export const updateElementsToTeacher = (data) => API.put(`/element/update_uncharge_prof?idProfesseur=${data.idProfesseur}&idElement=${data.idElement}`);
 export const validateElement = (id) => API.put(`/element/validateElement/${id}`);

 export const fetchStudents = () => API.get(`/student/fetch_all`); 


 export const fetchNotes = () => API.get(`/note/fetch_all`); 
 export const validateNote = (formData) => API.put(`/note/validateNote`,formData)
 export const saveBrouillon = (formData) => API.put(`/note/SaveBrouillon`,formData)
 export const deleteBrouillon = (id) => API.put(`/note/deleteBrouillon/${id}`)

 export const fetchTodosByIdCompte = (id) => API.get(`/todo/fetchTodos/${id}`);
 export const addTodo = (formData) => API.post(`/todo/add`,formData);
 export const deleteTodo = (id) => API.delete(`/todo/delete/${id}`);
 export const updateTodo = (formData) => API.put(`/todo/update`,formData); 

 

 export const fetchNotification = ()=> API.get(`/notification/fetch_all`) ;
 export const addNotification = (formData)=> API.post(`/notification/add`,formData) ;
 export const removeNotification = (id)=> API.delete(`/notification/delete/${id}`) ;


 export const fetchEvents = (id)=> API.get(`/event/fetch_all/${id}`);
 export const addEvent = (formData)=> API.post(`/event/add`, formData) ;
 export const removeEvent = (id)=> API.delete(`/event/delete/${id}`);



export const signIn = (formData) => API.post(`/compte/login`, formData);

export const signUp = (formData) => API.post(`/compte/signup`, formData);