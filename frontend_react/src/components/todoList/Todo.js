import React, { useState } from 'react';
import TodoForm from './TodoForm';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Checkbox } from '@mui/material';
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    // const [checked, setChecked] = React.useState(true);

    // const handleChange = (event) => {
    //   setChecked(event.target.checked);
    // };
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.slice().reverse().map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
    
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
      {/* <Checkbox sx={{color:"white"}}
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    /> */}
        {todo.text}
      </div>
      <div className='icons'>
        <HighlightOffIcon
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <ModeEditOutlineIcon
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;