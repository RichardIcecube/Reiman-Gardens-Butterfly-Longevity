package com.butterfly.entity;

public class MinimalUser {
    private String username;

    public MinimalUser(){}

    public MinimalUser(String username) {
        this.username = username;
    }
    public String getUsername(){
        return this.username;
    } 
    public void setUsername(String username) {
        this.username = username;
    }
}
