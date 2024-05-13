package com.butterfly.repository;

import com.butterfly.entity.Butterfly;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ButterflyRepository extends JpaRepository<Butterfly, Long> {
    // Additional custom query methods can be defined here if needed
    void deleteBySciName(String sciName);

    Butterfly findByAlphaCode(String alphaCode);
    List<Butterfly> findByStatus(String status);
}
