package com.butterfly.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

@Entity
public class Butterfly {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sciName;
    private String normName;
    private String alphaCode;
    private String status;
    private Date creationDate;
    private Date deathDate;
    private Integer totViews;
    private String user;

    @OneToMany(mappedBy = "butterfly", cascade = CascadeType.ALL)
    @JsonIgnore // or use @JsonBackReference
    private List<Log> logs = new ArrayList<>();
    // Constructors

    public Butterfly() {
        // Default constructor
    }

    public Butterfly(String sciName, String normName, String alphaCode, String status, Date creationDate,
                     Date deathDate, Integer totViews, String user) {
        this.sciName = sciName;
        this.normName = normName;
        this.alphaCode = alphaCode;
        this.status = status;
        this.creationDate = creationDate;
        this.deathDate = deathDate;
        this.totViews = totViews;
        this.user = user;
    }

    // Getters and Setters


    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSciName() {
        return sciName;
    }

    public void setSciName(String sciName) {
        this.sciName = sciName;
    }

    public String getNormName() {
        return normName;
    }

    public void setNormName(String normName) {
        this.normName = normName;
    }

    public String getAlphaCode() {
        return alphaCode;
    }

    public void setAlphaCode(String alphaCode) {
        this.alphaCode = alphaCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(Date deathDate) {
        this.deathDate = deathDate;
    }

    public Integer getTotViews() {
        return totViews;
    }

    public void setTotViews(Integer totViews) {
        this.totViews = totViews;
    }
}