package com.miniprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miniprojet.model.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
	

}
