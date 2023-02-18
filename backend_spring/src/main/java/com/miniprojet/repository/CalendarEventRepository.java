package com.miniprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miniprojet.model.CalendarEvent;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Integer> {
	 List<CalendarEvent> findCalendarEventByCompte_id( int compte);
}
