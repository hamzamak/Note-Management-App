package com.miniprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniprojet.model.Professeur;
import com.miniprojet.service.ServiceProfesseur;

@RestController
@RequestMapping("/teacher")
@CrossOrigin
public class ProfesseurController {

	@Autowired
	ServiceProfesseur serviceProfesseur ;
	
	@GetMapping("/fetch_all") 
	public List<Professeur> fetchAllProfesseurs() {	
		return serviceProfesseur.getAllProfesseurs();	
	}
}
