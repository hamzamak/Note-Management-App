package com.miniprojet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.miniprojet.model.Compte;
import com.miniprojet.repository.CompteRepository;


@Service
public class CompteService {
	
	@Autowired
	CompteRepository compteRepository ;
	//PasswordEncoder passwordEncoder; 
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
  
	
	public List<Compte> getAllComptes() {return compteRepository.findAll();}
	
	public Optional<Compte> findCompteById(int id) {
		return compteRepository.findById(id);
	}

	
	public Compte create(Compte c) {
		c.setPassword(new BCryptPasswordEncoder().encode(c.getPassword()));
		return compteRepository.save(c);
	}
	
	//@Transactional
	public Compte getCompteByLogin(String login) {	return compteRepository.findCompteByLogin(login);}
	
    public Compte getCompteByLoginAndPassword(String login , String password) {
	  Compte isExiste = compteRepository.findCompteByLogin(login);
	//  System.out.println(isExiste.toString());
	  if(isExiste == null) {
		  return null ;
	  }
	  else {
		  
	 
	  BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	  Boolean isMatch =  encoder.matches(password, isExiste.getPassword());
	  //System.out.println(isMatch);
	 if(isMatch) return compteRepository.findCompteByLoginAndPassword(login,isExiste.getPassword());
		
		return null;
	}
  }
    
    public Integer deleteCompte(Integer id) {
    	compteRepository.deleteById(id);
    	return id ;
    	
    }
    
    public Compte updateCompte(Compte c) {
    	Compte isExiste = compteRepository.findCompteByLogin(c.getLogin());
    	  if(isExiste != null) {
    		  return null ;
    	  }
    	  else {
    	Optional<Compte> updatedCompte = compteRepository.findById(c.getId());
    	
        
    	if(updatedCompte.isEmpty() ) return null;
    	
    	if(c.getLogin().isBlank() || c.getPassword().isBlank() || c.getUserName().isBlank() ) return null;
    	
    	updatedCompte.get().setPassword(new BCryptPasswordEncoder().encode(c.getPassword()));
    	updatedCompte.get().setUserName(c.getUserName());
    	updatedCompte.get().setImage(c.getImage());
    	updatedCompte.get().setLogin(c.getLogin());
    	return compteRepository.save(updatedCompte.get());
    	  }
    }
    
   /* public Compte updateProfil(MultipartFile file ,Compte c) {
    	Optional<Compte> updatedCompte = compteRepository.findById(c.getId());
        
    	if(updatedCompte.isEmpty() ) return null;
    	
    	if(c.getLogin() == null || c.getPassword() == null) return null;
    	
    	
    	if(getCompteByLogin(c.getLogin()) != null  ) return null;
    	updatedCompte.get().setLogin(c.getLogin());     	
    	updatedCompte.get().setPassword(new BCryptPasswordEncoder().encode(c.getPassword()));
    	updatedCompte.get().setRole(c.getRole());
    	
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		if(fileName.contains(".."))
		{
			System.out.println("not a a valid file");
			return null;
		}
		try {
			c.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		
    	return compteRepository.save(updatedCompte.get());
    }*/

}
