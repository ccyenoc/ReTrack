package com.retrack.backend.model;

public class EmailRequest {
    private String emailContent;

    public EmailRequest(String emailContent) {
     this.emailContent = emailContent;
    }

    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }
}