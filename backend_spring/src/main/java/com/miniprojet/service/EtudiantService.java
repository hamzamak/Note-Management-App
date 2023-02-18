package com.miniprojet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniprojet.model.Etudiant;
import com.miniprojet.repository.EtudiantRepository;

@Service
public class EtudiantService {
  
	@Autowired
	EtudiantRepository etudiantRepo ; 
	
	public List<Etudiant> getListEtudiants(){
		
		return etudiantRepo.findAll();
	}
}
