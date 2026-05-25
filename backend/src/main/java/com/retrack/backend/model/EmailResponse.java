package com.retrack.backend.model;

public class EmailResponse {

    private String category;

    private String title;

    private String summary;

    private String fullEmail;

    public EmailResponse(

        String category,

        String title,

        String summary,

        String fullEmail

    ) {

        this.category =
            category;

        this.title =
            title;

        this.summary =
            summary;

        this.fullEmail =
            fullEmail;

    }

    public String getCategory() {

        return category;

    }

    public String getTitle() {

        return title;

    }

    public String getSummary() {

        return summary;

    }

    public String getFullEmail() {

        return fullEmail;

    }

}