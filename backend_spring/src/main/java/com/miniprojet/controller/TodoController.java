package com.miniprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.miniprojet.model.Todo;
import com.miniprojet.service.CompteService;
import com.miniprojet.service.TodoService;

@RestController
@RequestMapping("/todo")
@CrossOrigin
public class TodoController {
	
	@Autowired
	TodoService todoService ;
	
	@Autowired
	CompteService compeSetvice;
	
	
	@GetMapping("/fetchTodos/{id}")
	public List<Todo> getTodosByIdCompte(@PathVariable(value = "id") int idCompte) {
		return todoService.getTodosByIdCompte(idCompte);
	}

	
	@PostMapping("/add")
	public ResponseEntity<Todo>  addToDo(@RequestBody Todo t) {
		return  new ResponseEntity<>(todoService.addToDo(t), HttpStatus.OK); 
	}

	@DeleteMapping("/delete/{id}")
	public int deleteTodoById(@PathVariable(value = "id") int id) {
		todoService.deleteTodoById(id);

		return id;
	}
	
	@PutMapping("/update")
	public ResponseEntity<Todo>  updateToDo(@RequestBody Todo t) {
		Todo todo =todoService.updateTodo(t);
		if (todo == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(todo, HttpStatus.OK);
		
	}


}
