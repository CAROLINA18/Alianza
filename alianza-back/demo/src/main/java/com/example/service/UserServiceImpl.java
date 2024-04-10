package com.example.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.User;

@Service
public class UserServiceImpl implements IUserService {
	
	public String keyGenerate(String name) {
		String [] key = name.split(" ");
		String sharedKey = key[0].substring(0,1);
		String lastname = "";
		if(key.length >= 2) {
			lastname += key[1];
		}else {
			 sharedKey = key[0];
		}	
		sharedKey = sharedKey + lastname;
		return sharedKey;
		
	}
	
	public String idGenerate() {
		String id=UUID.randomUUID().toString();
		return id;
	}
	

}
