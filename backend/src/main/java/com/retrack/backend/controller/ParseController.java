package com.retrack.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retrack.backend.model.EmailRequest;
import com.retrack.backend.model.EmailResponse;
import com.retrack.backend.service.TrackingService;

@RestController

@RequestMapping(
    "/api"
)

public class ParseController {

    private final
    TrackingService
    trackingService;

    public ParseController(

        TrackingService
        trackingService

    ) {

        this.trackingService =
            trackingService;

    }

    /*
     --------------------------------
     EMAIL PARSING
     --------------------------------
    */

    @PostMapping(
        "/extract-email"
    )

    public EmailResponse extractEmail(

        @RequestBody
        EmailRequest request

    ) {

        String content =
            request.getEmailContent();

        Pattern pattern =

            Pattern.compile(

                "\\b[A-Z0-9]{8,20}\\b"

            );

        Matcher matcher =

            pattern.matcher(
                content
            );

        if (

            matcher.find()

        ) {

            String tracking =

                matcher.group();

            return new EmailResponse(

                "parcel",

                "Parcel Detected",

                tracking

            );

        }

        if (

            content
                .toLowerCase()
                .contains(
                    "bill"
                )

            ||

            content
                .toLowerCase()
                .contains(
                    "payment"
                )

        ) {

            return new EmailResponse(

                "bill",

                "Bill Due",

                "Payment reminder"

            );

        }

        return new EmailResponse(

            "alert",

            "General Notification",

            content.substring(

                0,

                Math.min(

                    content.length(),

                    30

                )

            )

        );

    }

    /*
     --------------------------------
     GET EMAILS
     --------------------------------
    */

    @PostMapping(
        "/emails"
    )

    public List<EmailResponse> getEmails(

        @RequestBody
        Map<String,String>
        body

    ) {

        String code =

            body.get(
                "code"
            );

        if (

            code == null

        ) {

            throw new RuntimeException(

                "No authorization code received"

            );

        }

        List<String>
        emails =

            List.of(

                "Your parcel JT123456789MY is out for delivery",

                "Your electricity bill is due tomorrow",

                "Meeting scheduled with team",

                "New login detected"

            );

        List<EmailResponse>
        results =

            new ArrayList<>();

        for (

            String email

            :

            emails

        ) {

            results.add(

                extractEmail(

                    new EmailRequest(
                        email
                    )

                )

            );

        }

        return results;

    }

    /*
     --------------------------------
     TRACK PARCEL
     --------------------------------
    */

    @GetMapping(
        "/track/{tracking}"
    )

    public Map track(

        @PathVariable
        String tracking

    ) {

        return

            trackingService
                .track(

                    tracking

                );

    }

}