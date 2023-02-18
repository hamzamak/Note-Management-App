package com.miniprojet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniprojet.model.CalendarEvent;
import com.miniprojet.service.CalendarEventService;

@RestController
@RequestMapping("/event")
@CrossOrigin
public class CalendarEventController {
	@Autowired
	CalendarEventService eventService;
	
	@GetMapping("/fetch_all/{id}")
	public List<CalendarEvent> getAllEvents(@PathVariable(name="id") int id) {
		return eventService.getAllEventsByCompte(id);
	}
	@PostMapping("/add")
	public CalendarEvent addEvent(@RequestBody  CalendarEvent event) {
		return eventService.addEvent(event);
	}
	@DeleteMapping("/delete/{id}")
	public int removeEvent(@PathVariable(name = "id") int id) {

		eventService.removeEvent(id);
		return id ;
	}
}
