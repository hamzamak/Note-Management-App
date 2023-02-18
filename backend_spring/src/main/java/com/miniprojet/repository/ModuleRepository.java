package com.miniprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miniprojet.model.Module;

public interface ModuleRepository extends JpaRepository<Module, Long> {
	
	// ici jointure entre filiere et module , creer classe ici nome ListModule et met ce que vous voulez pour la reponse
	//@Query(value ="SELECT new com.miniprojet.dto.ListModule (m.id,  m.nom, m.isValid , new com.miniprojet.model.Filiere (f.id, f.nom, f.createdAt ) ) FROM Module m  JOIN Filiere f ON m.filiere = f.id" )
	
	//Jointure entre modue filiere semestre 
	/*@Query(value ="SELECT new com.miniprojet.dto.PopulatedModule (m.id,  m.nom, m.isValid ,new com.miniprojet.model.Semestre(s.id, s.nom), new com.miniprojet.model.Filiere (f.id, f.nom, f.createdAt )   ) FROM Module m  JOIN Filiere f ON m.filiere = f.id JOIN Semestre s ON m.semestre = s.id" )	//m.filiere refer au attribut classe pas champ sql filiere_id item pour f.id 		
    List<PopulatedModule> findJoinedTablesModules();*/
	
	//List<Module> findByModuleFiliere(String FiliereId);  fourni par jpa 
	
	
}


/*SELECT *
FROM module
INNER JOIN filiere ON module.filiere_id = filiere.id
INNER JOIN semestre ON module.semestre_id = semestre.id*/