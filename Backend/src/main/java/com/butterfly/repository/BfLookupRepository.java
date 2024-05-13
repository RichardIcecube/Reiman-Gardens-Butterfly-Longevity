package com.butterfly.repository;

import com.butterfly.entity.BfLookup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BfLookupRepository extends JpaRepository<BfLookup, Long> {
    // Additional custom query methods can be defined here if needed
    void deleteByScientificName(String scientificName);
}
