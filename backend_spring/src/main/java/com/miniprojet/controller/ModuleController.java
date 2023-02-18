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
import org.springframework.web.bind.annotation.RestController;

import com.miniprojet.model.Module;
import com.miniprojet.service.ModuleService;

@RestController
@RequestMapping("/module")
@CrossOrigin
public class ModuleController {

	@Autowired
	ModuleService moduleService;

	/*
	 * @GetMapping("/fetch_all") public List<PopulatedModule>
	 * findJoinedTablesModules(){ return moduleService.findJoinedTablesModules(); }
	 */

	@GetMapping("/fetch_all")
	public List<com.miniprojet.model.Module> findAllModules() {
		return moduleService.findAllModules();
	}

	@PutMapping("/validateModule/{id}")
	public ResponseEntity<Module> validateModule(@PathVariable(name="id") Long id) {
		Module module = moduleService.validateModule(id);
		if (module == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(module, HttpStatus.OK);
	}

}
