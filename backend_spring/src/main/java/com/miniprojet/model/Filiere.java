package com.miniprojet.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Filiere {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom; 
	private Date createdAt=new Date();
	@OneToMany(mappedBy = "filiere")
	private List<Module> modules ;
	
	public Filiere(Long id, String nom, Date createdAt) {
		super();
		this.id = id;
		this.nom = nom;
		this.createdAt = createdAt;
	}
	public Filiere() {
		super();
		// TODO Auto-generated constructor stub
	} 
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	 
	
	
}
