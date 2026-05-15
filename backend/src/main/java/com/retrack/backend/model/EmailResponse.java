package com.retrack.backend.model;

public class EmailResponse {

    private String type;
    private String title;
    private String subtitle;

    public EmailResponse(String type, String title, String subtitle) {
        this.type = type;
        this.title = title;
        this.subtitle = subtitle;
    }

    public String getType() { return type; }
    public String getTitle() { return title; }
    public String getSubtitle() { return subtitle; }
}