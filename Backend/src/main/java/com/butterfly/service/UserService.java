package com.butterfly.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.butterfly.repository.UserRepository;
import com.butterfly.entity.User;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public User getUserById(Long id) {
    return userRepository.findById(id)
        .orElse(null);
  }

  public User getUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public List<User> getUserByUserType(String userType) {
    return userRepository.findByUserType(userType);
  }

  public User createUser(User user) {
    String tempUsername = user.getUsername().strip();
    
    if (user.getUserType().equals("admin")) {
      List<User> tempUser = userRepository.findByUserType("admin");
      for(int i =0; i < tempUser.size(); i++){
        if(tempUser.get(i).getUsername().equals(tempUsername))
          return tempUser.get(i);
      }
    }
    if (userRepository.findByUsername(tempUsername) != null) {
      for (int i = 1; i < Integer.MAX_VALUE; i++) {
        tempUsername = user.getUsername() + " " + i;
        if (userRepository.findByUsername(tempUsername) == null)
          break;
      }
    }
    user.setUsername(tempUsername);
    return userRepository.save(user);
  }

  public User updateUser(Long id, User updatedUser) {
    Optional<User> optionalUser = userRepository.findById(id);
    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      user.setUsername(updatedUser.getUsername().strip());
      user.setUserType(updatedUser.getUserType());
      user.setPassword(updatedUser.getPassword());
      // Update other fields as needed
      return userRepository.save(user);
    }
    return null;
  }

  public User getByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  public void deleteAllUser() {
    userRepository.deleteAll();
  }

  public boolean validateUser(String username, String password) {
    User user = userRepository.findByUsername(username);
    if (user != null) {
      return user.getPassword().equals(password);
    }
    return false;
  }
}
