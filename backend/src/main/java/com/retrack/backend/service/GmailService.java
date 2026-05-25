package com.retrack.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.json.gson.GsonFactory;

import com.google.api.services.gmail.Gmail;

import com.google.api.services.gmail.model.Message;

import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import org.springframework.beans.factory.annotation.Value;

@Service
public class GmailService {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.redirect.uri}")
    private String redirectUri;


    public List<String> fetchEmails(
    String code,
    String codeVerifier
)

throws Exception

{

    System.out.println(
        "AUTH CODE: "
        + code
    );

    var transport =
        GoogleNetHttpTransport
            .newTrustedTransport();

    var json =
        GsonFactory
            .getDefaultInstance();

    GoogleAuthorizationCodeTokenRequest tokenRequest =

new GoogleAuthorizationCodeTokenRequest(

    transport,

    json,

    "https://oauth2.googleapis.com/token",

    clientId,

    null,

    code,

    redirectUri

);

tokenRequest.put(

    "code_verifier",

    codeVerifier

);

var token =

    tokenRequest
        .execute();

    System.out.println(
        "ACCESS TOKEN: "
        +
        token.getAccessToken()
    );

    Gmail gmail =

        new Gmail.Builder(

            transport,

            json,

            request ->

                request
                    .getHeaders()

                    .setAuthorization(

                        "Bearer "
                        +

                        token
                        .getAccessToken()

                    )

        )

        .setApplicationName(
            "Retrack"
        )

        .build();

    ListMessagesResponse inbox =

        gmail
            .users()
            .messages()
            .list(
                "me"
            )
            .setMaxResults(
                10L
            )
            .execute();

    System.out.println(
        "MESSAGES:"
        +
        inbox
    );

    List<String> emails =
        new ArrayList<>();

    if (

        inbox
        .getMessages()

        ==
        null

    ) {

        return emails;

    }

    for (

        Message msg

        :

        inbox
        .getMessages()

    ) {

        Message full =

            gmail
                .users()
                .messages()

                .get(

                    "me",

                    msg
                    .getId()

                )

                .execute();

        System.out.println(
            "EMAIL:"
            +
            full.getSnippet()
        );

        emails.add(

            full
            .getSnippet()

        );

    }

    return emails;

}
}