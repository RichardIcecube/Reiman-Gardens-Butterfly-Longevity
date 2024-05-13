package com.butterfly.entity;

import com.butterfly.entity.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
    private Date creationDate;

    private String action;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("logs") // Ignore logs property during serialization
    private User user;

    @ManyToOne
    @JoinColumn(name = "butterfly_id", nullable = false)
    @JsonIgnoreProperties("logs") // Ignore logs property during serialization
    private Butterfly butterfly;

    // Constructors, getters and setters

    public Log() {
        this.creationDate = new Date();
    }

    public Log(String action) {
        this.creationDate = new Date();
        this.action = action;
    }

    public Log(Butterfly butter, User user, String action) {
        this.creationDate = new Date();
        this.butterfly = butter;
        this.user = user;
        this.action = action;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Butterfly getButterfly() {
        return butterfly;
    }

    public void setButterfly(Butterfly butterfly) {
        this.butterfly = butterfly;
    }
}
