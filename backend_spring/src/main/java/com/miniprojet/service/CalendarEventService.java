package com.miniprojet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniprojet.model.CalendarEvent;
import com.miniprojet.repository.CalendarEventRepository;

@Service
public class CalendarEventService {
 
	@Autowired
	CalendarEventRepository CalendarEventRepo ;
	
	public List<CalendarEvent> getAllEventsByCompte(int id) {
		return CalendarEventRepo.findCalendarEventByCompte_id(id);
	}

	public CalendarEvent addEvent(CalendarEvent event) {
		return CalendarEventRepo.save(event);
	}

	public void removeEvent(int id) {

		CalendarEventRepo.deleteById(id);
	}
}
