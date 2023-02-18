package com.miniprojet.util;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import javax.crypto.spec.SecretKeySpec;

import com.miniprojet.model.Compte;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtGenerator {
	static int JWT_EXPIRATION = 600000 ; 
	static String JWT_SECRET = "asdfSFS34wfsdfsdfSDSD32dfsddDDerQSNCK34SOWEK5354fdgdf4";
	
	public static String getJwt(Compte c) {
		Instant now = Instant.now();
		Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(JWT_SECRET), 
	            SignatureAlgorithm.HS256.getJcaName());
		String jwtToken = Jwts.builder()
		        .claim("id", c.getId())  //payload
		        .claim("login", c.getLogin()) 
		        .claim("userName", c.getUserName())  
		        .claim("role", c.getRole()) 
		        .claim("image", c.getImage()) 
		        .claim("idProf", c.getProfesseur() == null ? "***" : c.getProfesseur().getCode()) 
		        .setSubject(c.getLogin()) //sub whom the token refer to
		        .setId(UUID.randomUUID().toString()) //jti id unique for this token
		        .setIssuedAt(Date.from(now))
		        .setExpiration(Date.from(now.plus(5l, ChronoUnit.HOURS))) // 5h temp expiration
		        .signWith(hmacKey)
		        .compact();
		return jwtToken ;
	}
	
}
