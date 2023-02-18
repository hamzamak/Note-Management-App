import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { add_Todo, delete_Todo, update_Todo } from '../../actions/Todolist';
import secureLocalStorage from 'react-secure-storage';
import { USER } from '../../constants/utilConstants';

function TodoList() {
  const dispatch = useDispatch()
  const todoList = useSelector(state => state.adminReducers.todoList)
 // const [todos, setTodos] = useState(todoList);
  const user = secureLocalStorage.getItem(USER)
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    } 
  //  const newTodos = [todo, ...todos];
   // setTodos(newTodos);
    dispatch(add_Todo({...todo ,isComplete:false, compte : {id : user.id}}))
   // console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }


    dispatch(update_Todo({id : todoId , text : newValue.text}))
   // setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
   // const removedArr = [...todos].filter(todo => todo.id !== id);
    dispatch(delete_Todo(id))
   // setTodos(removedArr);
  };

  const completeTodo = id => {
   /* let updatedTodos = todoList.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      //return todo;
    });*/
    
    const updateTodo = todoList.find(todo => todo.id === id);
    console.log(updateTodo)
    dispatch(update_Todo({...updateTodo  , isComplete :!updateTodo.isComplete}))
    // dispatch update complete todo
   // setTodos(updatedTodos);
  };

  return (
    <Paper sx ={{p:3,borderRadius:5, display:"flex",flexDirection:"column",justifyContent:"flex-start",bgcolor:"#36454F",textAlign:"center",pb:3.5,fontFamily:"Montserrat"}} elevation={8}>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todoList}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </Paper>
  );
} 

export default TodoList;