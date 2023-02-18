package com.miniprojet.model;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Note {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idNote ;
	
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "etudiant_code")
	    private Etudiant etudiant;
	    
	    @ManyToOne(cascade = CascadeType.ALL) 
	    @JoinColumn(name = "element_id")
	    private Element element; 
	    
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "modalite_id")
	    private Modalite modalite;
	     
	    private boolean isValid=false; 
	    private boolean isAbscent=false; 
	    
	    private boolean isBrouillon=false; 
	    
	    private Float valeurBrouillon ; 
	    private boolean isAbscentBrouillon=false; 
	    
	    private Date createdAtBrouillon ;
	    
	    private Float valeur ;
  
		public Note() {
			super();
		}
            
		public Note(Long idNote, Etudiant etudiant, Element element, boolean isValid, Float valeur) {
			super();
			this.idNote = idNote;
			this.etudiant = etudiant;
			this.element = element;
			this.isValid = isValid;
			this.valeur = valeur;
		}
		

		public Note(Long idNote, Etudiant etudiant, Element element, boolean isValid, boolean isAbscent, Float valeur) {
			super();
			this.idNote = idNote;
			this.etudiant = etudiant;
			this.element = element;
			this.isValid = isValid;
			this.isAbscent = isAbscent;
			this.valeur = valeur;
		}

		public Long getIdNote() {
			return idNote;
		}

		public void setIdNote(Long idNote) {
			this.idNote = idNote;
		}

		public Etudiant getEtudiant() {
			return etudiant;
		}

		public void setEtudiant(Etudiant etudiant) {
			this.etudiant = etudiant;
		}

		public Element getElement() {
			return element;
		}

		public void setElement(Element element) {
			this.element = element;
		}

		public boolean isValid() {
			return isValid;
		}

		public void setValid(boolean isValid) {
			this.isValid = isValid;
		}

		public Float getValeur() {
			return valeur;
		}

		public void setValeur(Float valeur) {
			this.valeur = valeur;
		}

		

		public boolean isAbscent() {
			return isAbscent;
		}

		public void setAbscent(boolean isAbscent) {
			this.isAbscent = isAbscent;
		}

		public Modalite getModalite() {
			return modalite;
		}

		public void setModalite(Modalite modalite) {
			this.modalite = modalite;
		}

		public boolean isBrouillon() {
			return isBrouillon;
		}

		public void setBrouillon(boolean isBrouillon) {
			this.isBrouillon = isBrouillon;
		}

		public Float getValeurBrouillon() {
			return valeurBrouillon;
		}

		public void setValeurBrouillon(Float valeurBrouillon) {
			this.valeurBrouillon = valeurBrouillon;
		}

		public boolean isAbscentBrouillon() {
			return isAbscentBrouillon;
		}

		public void setAbscentBrouillon(boolean isAbscentBrouillon) {
			this.isAbscentBrouillon = isAbscentBrouillon;
		}

		public Date getCreatedAtBrouillon() {
			return createdAtBrouillon;
		}

		public void setCreatedAtBrouillon(Date createdAtBrouillon) {
			this.createdAtBrouillon = createdAtBrouillon;
		}
		 
	    

}
