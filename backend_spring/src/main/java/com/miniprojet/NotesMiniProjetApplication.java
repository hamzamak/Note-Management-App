package com.miniprojet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication (exclude = SecurityAutoConfiguration.class) // exlure spring security nous voulons travailler just avec les algo
																  //hashage du mot de passe dans spring security
public class NotesMiniProjetApplication  {

	public static void main(String[] args) {
		SpringApplication.run(NotesMiniProjetApplication.class, args);
	}

}
