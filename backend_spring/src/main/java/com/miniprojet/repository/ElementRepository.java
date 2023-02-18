package com.miniprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.miniprojet.model.Element;

import jakarta.transaction.Transactional;

public interface ElementRepository extends JpaRepository<Element, Long>{
	@Query(nativeQuery = true, value ="SELECT * FROM Element e  WHERE e.professeur_code  is NULL")  
    List<Element> findAllElementsNotAffectedToProf();
	
	//The EntityManager doesn't flush change automatically by default. You should use @Modifying with your statement of query:
	@Modifying
	@Transactional //dont forgot to place @Transactional
	@Query(nativeQuery = true, value ="update  Element e SET e.professeur_code =?1 WHERE e.id =?2")  
    void affectElementToProf(int idProfesseur , int idElement); //car UPDATE queries do not return values - they return the number of rows that were altered or affected.
	
	List<Element> findElementByModule_id(Long id);
	
}
