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
public class Compte {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id ;
	private String login ;
	private String password;
	private String userName= "user";
	/*@Lob 
	@Column(columnDefinition = "MEDIUMBLOB")*/
	private String image;
	private String role="professeur"; //role par defaut
	 
	
	/*@OneToOne //cascade = CascadeType.ALL
	@JoinColumn(name = "professeur_id", unique=true)
	private Professeur professeur ;*/
	
	@JsonIgnore
	 @OneToMany(mappedBy = "compte")
	    private List<Todo> todolist ;
	
	@JsonIgnore
	 @OneToMany(mappedBy = "compte")
	    private List<CalendarEvent> events ;
	 
	@ManyToOne
	private Professeur professeur ;
	
	public Compte() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Compte(int id) {
		super();
		this.id = id;
	}

	public Compte(String login, String password, String role) {
		super();
		this.login = login;
		this.password = password;
		this.role = role;
	}
	public Compte(String login, String password) {
		super();
		this.login = login;
		this.password = password;
	}
	public Compte(int id,  String login, String role) {
		super();
		this.id = id;
		this.login = login;
		this.role = role;
	}
	
	public Compte(int id, String login, String password, String role, Professeur professeur, Boolean isActive) {
		super();
		this.id = id;
		this.login = login;
		this.password = password;
		this.role = role;
		this.professeur = professeur;
		this.isActive = isActive; 
	}
	
	public Compte(int id, String login, String password, String userName, String role, Professeur professeur,
			Boolean isActive) {
		super();
		this.id = id;
		this.login = login;
		this.password = password;
		this.userName = userName;
		this.role = role;
		this.professeur = professeur;
		this.isActive = isActive;
	}
	
	public Boolean getIsActive() {
		return isActive; 
	} 
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	private Boolean isActive= false ; 
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	

	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	public Professeur getProfesseur() {
		return professeur;
	} 
	public void setProfesseur(Professeur professeur) {
		this.professeur = professeur;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return "Compte [id=" + id + ", login=" + login + ", password=" + password + ", userName=" + userName + ", role="
				+ role + ", professeur=" + professeur + ", isActive=" + isActive + "]";
	}
	public List<Todo> getTodolist() {
		return todolist;
	}
	public void setTodolist(List<Todo> todolist) {
		this.todolist = todolist;
	}
	
	
	

}
