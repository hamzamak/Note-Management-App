package com.miniprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.miniprojet.model.Element; 
import com.miniprojet.service.ElementService;

@RestController
@RequestMapping("/element")
@CrossOrigin
public class ElementController {
	@Autowired
	ElementService elementService ;
	
	@PutMapping("/update_uncharge_prof")
	public void affectElementToProf( @RequestParam("idProfesseur")  int idProfesseur , @RequestParam("idElement") int idElement) {
		//on passe QueryParam sinon il faut wrapper Long into bean et met dans requestBody / pathVariable not perfect car on a 2 valeurs a envoyer
		 elementService.affectElementToProf( idProfesseur ,  idElement);
	}
	
	
	@GetMapping("/fetch_all")
	List<Element> findAll() {
		return elementService.findAll();
	}

	
	@PutMapping("/validateElement/{id}")
	public ResponseEntity<Element> validateElement( @PathVariable("id")  Long id ) {
		Element element = elementService.validateElement(id);
		if(element == null)
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else 	return new ResponseEntity<>(element, HttpStatus.OK);
	}
	
}
