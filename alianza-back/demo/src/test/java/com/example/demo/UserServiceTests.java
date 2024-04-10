package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.service.IUserService;

@SpringBootTest
public class UserServiceTests {
	
	 @Autowired
	    private IUserService userService;

	    @Test
	    public void testKeyGenerate() {
	        String name = "Ana Aristizabal";
	        String result = userService.keyGenerate(name);
	        assertEquals("AAristizabal", result);
	    }
	    
	    @Test
	    public void testIdGenerate() {
	       
	        String id = userService.idGenerate();
	        assertNotNull(id);
	        assertTrue(isValidUUID(id));
	    }

	 
	    private boolean isValidUUID(String id) {
	        try {
	            UUID.fromString(id);
	            return true;
	        } catch (IllegalArgumentException e) {
	            return false;
	        }
	    }

}
