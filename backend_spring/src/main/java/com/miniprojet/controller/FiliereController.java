package com.miniprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniprojet.model.Filiere;
import com.miniprojet.service.FiliereService;



@RestController
@RequestMapping("/filiere")
@CrossOrigin
public class FiliereController {
	@Autowired
	FiliereService filiereService ;
	
	@GetMapping("/fetch_all")
	public List<Filiere> getAllFilieres() {return filiereService.getAllFilieres();}
}
