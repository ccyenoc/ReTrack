package com.retrack.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retrack.backend.config.Config;
import com.retrack.backend.service.EasyParcelOAuthService;

import jakarta.servlet.http.HttpServletResponse;

@RestController

@RequestMapping(
    "/easyparcel"
)

public class EasyParcelController {

    private final Config config;

    private final EasyParcelOAuthService oauth;

    public EasyParcelController(

        Config config,

        EasyParcelOAuthService oauth

    ) {

        this.config =
            config;

        this.oauth =
            oauth;

    }

    /*
     --------------------------------
     LOGIN
     --------------------------------
    */

    @GetMapping(
        "/login"
    )

    public void login(

        HttpServletResponse response

    )

    throws IOException {

        String url =

            "https://api.easyparcel.com/oauth/login"

            +

            "?client_id="

            +

            config.getClientId()

            +

            "&redirect_uri="

            +

            config.getRedirectUri();

        response.sendRedirect(
            url
        );

    }

    /*
     --------------------------------
     CALLBACK
     --------------------------------
    */

    @GetMapping(
    "/callback"
)

public Map<String,Object> callback() {

    return Map.of(

        "success",
        true,

        "token",

        config.getToken()

    );
}
}