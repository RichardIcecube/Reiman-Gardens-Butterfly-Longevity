package com.butterfly.repository;

import com.butterfly.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Additional custom query methods can be defined here if needed
    User findByUsername(String username);
    List<User> findByUserType(String userType);
}
