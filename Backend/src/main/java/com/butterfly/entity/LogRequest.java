package com.butterfly.entity;

import jakarta.persistence.*;
import java.util.Date;
public class LogRequest {
    private Date creationDate;
    private String action;
    private Long userId;
    private Long butterflyId;

    // Constructor, getters, and setters
    // Constructor
    public LogRequest() {}

    // Getters and setters
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getButterflyId() {
        return butterflyId;
    }

    public void setButterflyId(Long butterflyId) {
        this.butterflyId = butterflyId;
    }
}