package com.butterfly.entity;

public class PublicBFView {
    private String alphaCode;
    private String user;

    public PublicBFView(){}

    // Constructor
    public PublicBFView(String alphaCode, String user) {
        this.alphaCode = alphaCode;
        this.user = user;
    }

    // Getters
    public String getAlphaCode() {
        return alphaCode;
    }

    public String getUser() {
        return user;
    }

    // Setters
    public void setAlphaCode(String alphaCode) {
        this.alphaCode = alphaCode;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
