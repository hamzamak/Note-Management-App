package com.miniprojet.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Element {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom;
	private Boolean isValid=false;
	private double coefficient  ;
	//@JsonIgnore
	@ManyToOne
	private Module module ;
	
	//@JsonIgnore
	@ManyToOne
	private Professeur professeur ;
	
	/*@JsonIgnore
	@OneToMany(mappedBy = "element")
	private List<Modalite> modalites ;*/
	
	@JsonIgnore
	 @OneToMany(mappedBy = "element")
	    private List<Note> notes ;
	
	public Element() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Element(Long id, String nom, Boolean isValid) {
		super();
		this.id = id;
		this.nom = nom;
		this.isValid = isValid;
	}
	
	
	public Element(Long id, String nom, Boolean isValid, double coefficient) {
		super();
		this.id = id;
		this.nom = nom;
		this.isValid = isValid;
		this.coefficient = coefficient;
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
	public Boolean getIsValid() {
		return isValid;
	}
	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	public Professeur getProfesseur() {
		return professeur;
	}

	public void setProfesseur(Professeur professeur) {
		this.professeur = professeur;
	}

	

	public List<Note> getNotes() {
		return notes;
	}

	public void setNotes(List<Note> notes) {
		this.notes = notes;
	}

	public double getCoefficient() {
		return coefficient;
	}

	public void setCoefficient(double coefficient) {
		this.coefficient = coefficient;
	}

	
   
	
	
}
