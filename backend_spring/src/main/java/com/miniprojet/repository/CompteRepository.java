package com.miniprojet.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniprojet.model.Compte;

public interface CompteRepository extends JpaRepository<Compte, Integer> {
	/*@Query(nativeQuery = true, value ="SELECT id,login,role FROM Compte c")  //on utilise native query car il dispose de clause limit
    List<Compte> findAll();*/
	
	//@Query(nativeQuery = true, value ="SELECT * FROM Compte c  WHERE c.login = ?1 LIMIT 1")  //on utilise native query car il dispose de clause limit
     Compte findCompteByLogin( String login);
	
	//@Query("SELECT c FROM Compte c  WHERE c.login = ?1 and c.password = ?2") 
    Compte findCompteByLoginAndPassword( String login, String password);
}
