package com.miniprojet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Todo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id ;
	private String text ;
	private Boolean isComplete = false ;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  //c 'est pa la peine de fetch compte  during serialization
	@ManyToOne
	private Compte compte ;

	public Todo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Todo(String text, Compte compte) {
		super();
		this.text = text;
		this.compte = compte;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
 
	@JsonIgnore
	public Compte getCompte() {
		return compte;
	}

	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	public Boolean getIsComplete() {
		return isComplete;
	}

	public void setIsComplete(Boolean isComplete) {
		this.isComplete = isComplete;
	}



	public Todo(String text, Boolean isComplete, Compte compte) {
		super();
		this.text = text;
		this.isComplete = isComplete;
		this.compte = compte;
	}
	
	

}
