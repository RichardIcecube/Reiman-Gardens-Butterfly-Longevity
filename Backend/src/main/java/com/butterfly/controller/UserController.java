package com.butterfly.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

import com.butterfly.entity.User;
import com.butterfly.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
    User user = userService.getUserById(id);
    if (user != null) {
      return new ResponseEntity<>(user, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody User user) {
    if (user.getCreateDate() == null)
      user.setCreateDate(new Date());
    User createdUser = userService.createUser(user);
    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
    User updated = userService.updateUser(id, updatedUser);
    if (updated != null) {
      return new ResponseEntity<>(updated, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
    userService.deleteUser(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @PostMapping("/login")
  public ResponseEntity<Void> login(@RequestBody User user) {
    List<User> tempUser = userService.getUserByUserType(user.getUserType());
    if (user.getCreateDate() == null)
      user.setCreateDate(new Date());
    if (user.getPassword().equals(tempUser.get(0).getPassword())) {
      userService.createUser(user);
      return new ResponseEntity<>(HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }
}