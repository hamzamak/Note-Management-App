package com.miniprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniprojet.model.Professeur;


public interface ProfesseurRepository extends JpaRepository<Professeur, Long> {

}
