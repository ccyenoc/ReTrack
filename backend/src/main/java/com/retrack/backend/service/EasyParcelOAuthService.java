package com.retrack.backend.service;

import org.springframework.stereotype.Service;

import com.retrack.backend.config.Config;

@Service
public class EasyParcelOAuthService {

    private final Config config;

    public EasyParcelOAuthService(
        Config config
    ) {

        this.config =
            config;

    }

    public String getToken() {

        return
            config.getToken();

    }

}