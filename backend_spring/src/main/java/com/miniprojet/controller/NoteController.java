package com.miniprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.miniprojet.model.Note;
import com.miniprojet.service.NoteService;

@RestController
@RequestMapping("/note")
@CrossOrigin
public class NoteController {

	@Autowired
	NoteService noteService ;
	
	@GetMapping("/fetch_all")
	List<Note> findNotes(){
		return noteService.findNotes();
	}
	
	@PutMapping("/validateNote")
	public ResponseEntity<Note> validateNote(@RequestBody Note note){
		Note n = noteService.validateNote(note);
		if (n == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(n, HttpStatus.OK);

	}
	

	@PutMapping("/SaveBrouillon")
	public ResponseEntity<Note> SaveBrouillon(@RequestBody Note note){
		Note n = noteService.SaveBrouillon(note);
		if (n == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(n, HttpStatus.OK);

	}

	
	@PutMapping("/deleteBrouillon/{idNote}")
	public ResponseEntity<Note> deleteBrouillon(@PathVariable(name = "idNote") Long idNote){
		Note n = noteService.deleteBrouillon(idNote);
		if (n == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(n, HttpStatus.OK);

	}

	 
}
