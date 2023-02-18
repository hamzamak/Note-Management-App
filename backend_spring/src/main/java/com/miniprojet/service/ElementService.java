package com.miniprojet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniprojet.model.Element;
import com.miniprojet.repository.ElementRepository;

@Service
public class ElementService {
	@Autowired
	ElementRepository elementRepository ;
	
	public List<Element> findAllElementsNotAffectedToProf() {
		return elementRepository.findAllElementsNotAffectedToProf();
	}
	
	public void affectElementToProf(int idProfesseur , int idElement) {
		 elementRepository.affectElementToProf( idProfesseur ,  idElement);
	}
	
	
	public List<Element> findAll() {
		return elementRepository.findAll();
	}
	
	public Element validateElement(Long id) {
		Optional<Element> element = elementRepository.findById(id);
		if(element.isEmpty()) return null ;
		element.get().setIsValid(true);
		
		return elementRepository.save(element.get());
	}

}
