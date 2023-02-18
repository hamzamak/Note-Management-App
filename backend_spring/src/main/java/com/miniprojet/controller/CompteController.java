package com.miniprojet.controller;

import java.util.List;
import java.util.Optional;

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
import com.miniprojet.model.Compte;
import com.miniprojet.model.Professeur;
import com.miniprojet.service.CompteService;
import com.miniprojet.service.ServiceProfesseur;
import com.miniprojet.util.JwtGenerator;
import com.miniprojet.util.StringResponse;


@RestController
@RequestMapping("/compte")
@CrossOrigin
public class CompteController {
	// String message ;
	
	@Autowired
	CompteService compteService;

	@Autowired
	ServiceProfesseur professeurService;

	@GetMapping("/fetch_all")
	public List<Compte> fetchAll() {
		return compteService.getAllComptes();
	}

	@PostMapping("/add")
	public ResponseEntity<Compte> create(@RequestBody Compte c) {
		Optional<Professeur> prof = professeurService.getProfesseur(c.getProfesseur().getCode()); // facultatif cas du front pour redux car lors add compte return compe avec professeur champ null car  
																						               
		if (prof.isPresent()) {
			c.setProfesseur(prof.get());
		} else
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		Compte iscompteExiste = compteService.getCompteByLogin(c.getLogin()); // si au moins il y a un compte donc
																				// erreur
		if (iscompteExiste != null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(compteService.create(c), HttpStatus.OK);
	}

	@PostMapping("/login")

	public ResponseEntity<StringResponse> login(@RequestBody Compte compte) {

		Compte c = compteService.getCompteByLoginAndPassword(compte.getLogin(), compte.getPassword());
		if (c == null || c.getIsActive() == false ) {
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		else {
			
			//System.out.println(c.toString());
			return new ResponseEntity<>(new StringResponse(JwtGenerator.getJwt(c)), HttpStatus.OK);
		}
	}
	
	@PostMapping("/signup")

	public ResponseEntity<StringResponse> signup(@RequestBody Compte compte) {

		Compte c = compteService.getCompteByLogin(compte.getLogin());
		if (c == null || c.getIsActive() == true  || (c.getRole() =="professeur" && c.getProfesseur()==null ))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else {
			c.setIsActive(true);
			c.setPassword(compte.getPassword());
			//System.out.println(c.getPassword());
			Compte updatedCompte = compteService.create(c); // also utiliser pour update le compte c'est le cas ici
			//updatedCompte.setIsActive(true); // pour etre sure
			return new ResponseEntity<>(new StringResponse(JwtGenerator.getJwt(updatedCompte)), HttpStatus.OK);
			
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Integer> deleteCompte(@PathVariable(value = "id") Integer id) { // pourqoui return compte pour
																							// raison frontend redux
		try {
			return new ResponseEntity<>(compteService.deleteCompte(id), HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

	}

	@PutMapping("/update")
	public ResponseEntity<Compte> updateUser(@RequestBody Compte compte) {
		Compte c = compteService.updateCompte(compte);
		if (c == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(c, HttpStatus.OK);
	}

	/*@PostMapping("/upload-file")
	public String uploadImage(@RequestParam("file") MultipartFile file) {
		System.out.println(file.getOriginalFilename());
		System.out.println(file.getName());
		System.out.println(file.getContentType());
		System.out.println(file.getSize());
		return "Successfully Image is uploaded";
	}*/

	
	 
	 

}
