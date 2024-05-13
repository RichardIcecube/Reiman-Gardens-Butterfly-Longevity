package com.butterfly.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BfLookup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String scientificName;
    private String normalName;
    private int totViews;
    private String funFact;

    // Constructors

    public BfLookup() {
        // Default constructor
    }

    public BfLookup(String scientificName, String normalName) {
        this.scientificName = scientificName;
        this.normalName = normalName;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public String getNormalName() {
        return normalName;
    }

    public void setNormalName(String normalName) {
        this.normalName = normalName;
    }
}
