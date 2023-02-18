package com.miniprojet.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@Entity
@Table
public class Professeur {
	@Id
	private Long code ;
	private String nom ; 
	private String prenom ;
	private String specialite ;
	private String email ;
	private String tel ;
	@JsonIgnore
	@OneToMany(mappedBy = "professeur") 
	private List<Element> elements ;
	
	@JsonIgnore
	@OneToMany(mappedBy = "professeur") 
	private List<Compte> comptes ;
	
	/*@OneToOne(mappedBy = "professeur") //(cascade = CascadeType.ALL)
	private Compte compte ;*/
	
	public Professeur() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Professeur(Long code, String nom, String prenom, String specialite, String email, String tel) {
		super();
		this.code = code;
		this.nom = nom;
		this.prenom = prenom;
		this.specialite = specialite;
		this.email = email;
		this.tel = tel;
	}

	public Long getCode() {
		return code;
	}
	public void setCode(Long code) {
		this.code = code;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getSpecialite() {
		return specialite;
	}
	public void setSpecialite(String specialite) {
		this.specialite = specialite;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public List<Element> getElements() {
		return elements;
	}
	public void setElements(List<Element> elements) {
		this.elements = elements;
	}

	
	
}
