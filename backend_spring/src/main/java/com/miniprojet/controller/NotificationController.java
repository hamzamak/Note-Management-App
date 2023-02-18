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

import com.miniprojet.model.Notification;
import com.miniprojet.service.NotificationService;

@RestController
@RequestMapping("/notification")
@CrossOrigin
public class NotificationController {
	
	@Autowired
	NotificationService notificationService ;
	
	@GetMapping("/fetch_all")
	public List<Notification> getAllNotification() {
		return notificationService.getAllNotification();
	}

	@PostMapping("/add")
	public Notification addNotification(@RequestBody Notification notif) {
		return notificationService.addNotification(notif);
	}

	@DeleteMapping("/delete/{id}")
	public Integer removeNotifcation(@PathVariable(name = "id") int  id) {
          
		notificationService.removeNotifcation(id);
		return id ;
		
	}


}
