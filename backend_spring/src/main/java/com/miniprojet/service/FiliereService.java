package com.miniprojet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniprojet.model.Filiere;
import com.miniprojet.repository.FiliereRepository;

@Service
public class FiliereService {
  @Autowired
  FiliereRepository filiereRepo ;
  
  public List<Filiere> getAllFilieres() {return filiereRepo.findAll();}
}
