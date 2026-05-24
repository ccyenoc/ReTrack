package com.retrack.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Value(
        "${easyparcel.client-id}"
    )
    private String clientId;

    @Value(
        "${easyparcel.client-secret}"
    )
    private String clientSecret;

    @Value(
        "${easyparcel.redirect-uri}"
    )
    private String redirectUri;

    @Value(
        "${easyparcel.token}"
    )
    
    private String token;

    @Value("${easyparcel.api}")
private String api;

public String getApi() {
    return api;
}

    public String getClientId() {
        return clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public String getRedirectUri() {
        return redirectUri;
    }

    public String getToken() {
        return token;
    }

}