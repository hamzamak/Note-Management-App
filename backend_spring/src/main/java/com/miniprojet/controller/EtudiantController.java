package com.miniprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniprojet.model.Etudiant;
import com.miniprojet.service.EtudiantService;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class EtudiantController {

	@Autowired
	EtudiantService etudiantService;

	@GetMapping("/fetch_all")
	public List<Etudiant> getListEtudiants() {

		return etudiantService.getListEtudiants();
	}

}
