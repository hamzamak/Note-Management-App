package com.miniprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miniprojet.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
	  List<Todo> findTodoByCompte_id( int compte);
}
