package com.miniprojet.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.miniprojet.model.Note;

import com.miniprojet.repository.NoteRepository;

@Service
public class NoteService {
	@Autowired
	NoteRepository noteRepos;
	
	public List<Note> findNotes(){
		return noteRepos.findAll();
	}
	
	public Note validateNote(Note n){
		 Optional<Note> note = noteRepos.findById(n.getIdNote());
		 
		 if(note.isPresent()) {
			 note.get().setAbscent(n.isAbscent());
			 if(n.isAbscent()) {
				 note.get().setValeur(0F);
			 }
			 else {
				 note.get().setValeur(n.getValeur());				 
			 }
			 note.get().setValid(true);
			 note.get().setBrouillon(false);
				return noteRepos.save(note.get());
		 }
		 else
		 return null;
	}
	
	public Note SaveBrouillon(Note n){
		 Optional<Note> note = noteRepos.findById(n.getIdNote());
		 
		 if(note.isPresent()) {
			 note.get().setAbscentBrouillon(n.isAbscentBrouillon());
			 if(n.isAbscentBrouillon()) {
				 note.get().setValeurBrouillon(0F);
			 }
			 else {
				 note.get().setValeurBrouillon(n.getValeurBrouillon());				 
			 }
			 note.get().setValid(false);
			 note.get().setBrouillon(true);
			 note.get().setCreatedAtBrouillon(new Date());
			return noteRepos.save(note.get());
		 }
		 else
		 return null;
	}
	
	
	public Note deleteBrouillon(Long n){
		 Optional<Note> note = noteRepos.findById(n);
		 
		 if(note.isPresent()) {
			 note.get().setBrouillon(false);
			return noteRepos.save(note.get());
		 }
		 else
		 return null;
	}



}
