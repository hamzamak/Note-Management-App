package com.miniprojet.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniprojet.model.Element;
import com.miniprojet.model.Module;
import com.miniprojet.repository.ElementRepository;
import com.miniprojet.repository.ModuleRepository;

@Service
public class ModuleService {
	@Autowired
	ModuleRepository moduleRepo ;
	@Autowired
	ElementRepository elementRepository ;
	
	/*public List<PopulatedModule> findJoinedTablesModules(){
		return moduleRepo.findJoinedTablesModules();
	}*/
	
	public List<Module> findAllModules(){
		return moduleRepo.findAll();
	}

	
	//static boolean  shouldValidateModule = true ;
	public Module validateModule(Long id) {
		// on doit valider le module seulement si tous ces elements sont valides
		
		Optional<Module> module = moduleRepo.findById(id);
		ArrayList<Element> listElemetOfModule =  (ArrayList<Element>) elementRepository.findElementByModule_id(id);
		
		for(int i =0 ; i < listElemetOfModule.size() ; i++ ) {
			//System.out.println(listElemetOfModule.get(i).getNom() +"  " + listElemetOfModule.get(i).getIsValid());
			if (listElemetOfModule.get(i).getIsValid() ==false) {
				return null ;
				//shouldValidateModule = false;
				//break;
			}
		}
		//System.out.println(shouldValidateModule);
		if(module.isEmpty()) return null ;
		//if(shouldValidateModule == false) return null ;
		module.get().setIsValid(true);
		
		return moduleRepo.save(module.get());
	}
}
