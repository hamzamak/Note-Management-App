package com.miniprojet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.miniprojet.model.Todo;
import com.miniprojet.repository.TodoRepository;

@Service
public class TodoService {
	@Autowired
	TodoRepository todoRepo;

	public List<Todo> getTodosByIdCompte(int idCompte) {
		return todoRepo.findTodoByCompte_id(idCompte);
	}

	
	/*public Optional<Todo> findTodoById(int  id) {
		return todoRepo.findById(id);
	}*/

	public Todo addToDo(Todo t) {
		return todoRepo.save(t);
	}
	
	public Todo updateTodo(Todo t) {
		 Optional<Todo> todo = todoRepo.findById(t.getId());
		 if(todo.isPresent()) {
			 t.setCompte(todo.get().getCompte());
			 return todoRepo.save(t);
		 }
		 return null;
	}

	public int deleteTodoById(int id) {
		todoRepo.deleteById(id);
		return id;
	}

}
