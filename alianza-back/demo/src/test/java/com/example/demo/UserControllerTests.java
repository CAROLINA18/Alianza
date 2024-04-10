package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import com.example.controller.UserController;
import com.example.model.User;
import com.example.service.IUserService;
import com.fasterxml.jackson.databind.ObjectMapper;


@WebMvcTest(UserController.class)
public class UserControllerTests {
	
    private UserController userController;
    
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IUserService userService;

    private List<User> users;

    @Test
    public void testGetUserWithNullUsers() {
    	users = new ArrayList<>();
    	 userController = new UserController();
        ResponseEntity<List<User>> responseEntity = userController.getUser();


        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(0, responseEntity.getBody().size());
    }
    
   

    @Test
    public void testCreateUser() throws Exception {
    	users = new ArrayList<>();
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john.doe@example.com");
        user.setPhone("123456789");


        when(userService.keyGenerate(anyString())).thenReturn("JDoe");
        when(userService.idGenerate()).thenReturn("123e4567-e89b-12d3-a456-426614174000");

       
        mockMvc.perform(post("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.phone").value("123456789"))
                .andExpect(jsonPath("$.sharedKey").value("JDoe"))
                .andExpect(jsonPath("$.id").value("123e4567-e89b-12d3-a456-426614174000"));

        users.add(user);
        assertEquals(1, users.size());
        assertEquals(user, users.get(0));
    }

    
    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
