package com.miniprojet.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Modalite {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom ;
	private Float coefficient ;
	
	/*@ManyToOne
	private Element element ;*/
	
	@JsonIgnore
	 @OneToMany(mappedBy = "modalite")
	    private List<Note> notes ;

	
	public Modalite() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Modalite(Long id, String nom, Float coefficient) {
		super();
		this.id = id;
		this.nom = nom;
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

	public Float getCoefficient() {
		return coefficient;
	}

	public void setCoefficient(Float coefficient) {
		this.coefficient = coefficient;
	}

	
	
	

}
