package com.example.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.User;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/user")
public class UserController {
	
	private static Logger logController = Logger.getLogger(UserController.class);
	List<User> users;
	
	@GetMapping(produces= {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<User>> getUser() {
		if(users == null) users = new ArrayList<>();
		logController.debug(users);
		logController.info(users);
		return new ResponseEntity<List<User>>(users , HttpStatus.OK);
		
	}
	
	@PostMapping(consumes= {MediaType.APPLICATION_JSON_VALUE},
				 produces= {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<User> createUser(@RequestBody User user) {
		
		user.setName(user.getName());
		user.setEmail(user.getEmail());
		user.setPhone(user.getPhone());
		user.setStartDate(user.getStartDate());
		user.setEndDate(user.getEndDate());
		
		if(users == null) users = new ArrayList<>();
		String id=UUID.randomUUID().toString();
		String [] key = user.getName().split(" ");
		String sharedKey = key[0].substring(0,1);
		String lastname = "";
		if(key.length >= 2) {
			lastname += key[1];
		}else {
			 sharedKey = key[0];
		}	
		sharedKey = sharedKey + lastname;
		user.setSharedKey(sharedKey);
		user.setId(id);
		users.add(user);
		logController.info(sharedKey);
		return new ResponseEntity<User>(user , HttpStatus.OK);
	}
	
}

