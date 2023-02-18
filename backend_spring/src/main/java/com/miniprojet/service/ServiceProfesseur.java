package com.miniprojet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniprojet.model.Professeur;
import com.miniprojet.repository.ProfesseurRepository;

@Service
public class ServiceProfesseur {
	@Autowired
	ProfesseurRepository professeurRepository ;
	

	public List<Professeur> getAllProfesseurs() {
		return professeurRepository.findAll();
	}
	
	public Optional<Professeur> getProfesseur(Long code) {
		return professeurRepository.findById(code);
	}

}
