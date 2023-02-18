package com.miniprojet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.miniprojet.model.Notification;
import com.miniprojet.repository.NotificationRepository;

@Service
public class NotificationService {

	@Autowired
	NotificationRepository notificationRepo;

	public List<Notification> getAllNotification() {
		return notificationRepo.findAll();
	}

	public Notification addNotification(Notification notif) {
		return notificationRepo.save(notif);
	}

	public void removeNotifcation(int id) {

		 notificationRepo.deleteById(id);
	}

}
