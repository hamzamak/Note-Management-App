package com.miniprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miniprojet.model.Etudiant;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

}
