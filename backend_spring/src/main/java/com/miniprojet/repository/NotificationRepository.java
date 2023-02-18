package com.miniprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniprojet.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

}
