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
import com.retrack.backend.service.GmailService;
import com.retrack.backend.service.TrackingService;

@RestController
@RequestMapping("/api")
public class ParseController {

    private final TrackingService trackingService;

    private final GmailService gmailService;

    public ParseController(
        TrackingService trackingService,
        GmailService gmailService
    ) {

        this.trackingService =
            trackingService;

        this.gmailService =
            gmailService;

    }

    /*
    --------------------------------
    EMAIL PARSING
    --------------------------------
    */

@PostMapping("/extract-email")
public EmailResponse extractEmail(
    @RequestBody EmailRequest request
) {

    String content =
        request.getEmailContent();

    if (

        content == null
        ||
        content.isBlank()

    ) {

        return null;

    }

    content =
        content

            .replaceAll(
                "<[^>]*>",
                ""
            )

            .replaceAll(
                "&[^;]+;",
                "'"
            );

    String lower =
        content
            .toLowerCase();

    /*
    ----------------
    PARCEL
    ----------------
    */

    Pattern tracking =

        Pattern.compile(

            "\\b([A-Z]{2,5}\\d{8,18}[A-Z]{0,4})\\b"

        );

    Matcher parcel =
        tracking.matcher(
            content
        );

    boolean parcelContext =

        lower.contains("parcel")
        ||
        lower.contains("tracking")
        ||
        lower.contains("shipment")
        ||
        lower.contains("delivery")
        ||
        lower.contains("courier");

    if (

        parcel.find()
        &&
        parcelContext

    ) {

       return new EmailResponse(

    "parcel",

    detectWorkTitle(
        lower
    ),

    summarize(
        content
    ),

    content

);

    }

    /*
    ----------------
    ALERT
    (priority ↑)
    ----------------
    */

    if (

        containsAny(

            lower,

            "expire",
            "expiring",
            "expires",

            "meeting",
            "schedule",
            "scheduled",

            "security",
            "login",

            "reminder",

            "deadline",

            "alert",

            "warning",

            "verification",

            "action required",

            "important"

        )

    ) {

        new EmailResponse(

    "alert",

    detectAlertTitle(
        lower
    ),

    summarize(
        content
    ),

    content

);
    }

    /*
    ----------------
    BILL
    (strict)
    ----------------
    */

    int billScore =
        0;

    if (
        lower.contains("invoice")
    )
        billScore++;

    if (
        lower.contains("payment")
    )
        billScore++;

    if (
        lower.contains("billing")
    )
        billScore++;

    if (
        lower.contains("receipt")
    )
        billScore++;

    if (
        lower.contains("amount due")
    )
        billScore++;

    if (
        lower.contains("total amount")
    )
        billScore++;

    if (

        billScore
        >=
        2

    ) {

        return new EmailResponse(

    "bill",

    detectWorkTitle(
        lower
    ),

    summarize(
        content
    ),

    content

);

    }

    /*
    ----------------
    WORK
    ----------------
    */

    if (

        containsAny(

            lower,

            "interview",
            "application",
            "career",
            "talent",
            "recruit",
            "job",
            "candidate"

        )

    ) {

        return new EmailResponse(

    "work",

    detectWorkTitle(
        lower
    ),

    summarize(
        content
    ),

    content

);
    }

    /*
    Ignore spam
    */

    return null;

}

private boolean containsAny(
    String text,
    String... words
) {

    for (

        String w
        :
        words

    ) {

        if (

            text.contains(
                w
            )

        ) {

            return true;

        }

    }

    return false;

}

private String detectAlertTitle(
    String lower
) {

    if (
        lower.contains(
            "expire"
        )
    )
        return "Expiring Soon";

    if (
        lower.contains(
            "meeting"
        )
    )
        return "Meeting";

    if (
        lower.contains(
            "scheduled"
        )
    )
        return "Scheduled";

    if (
        lower.contains(
            "security"
        )
    )
        return "Security";

    return "Alert";

}

private String summarize(
    String content
) {

    if (

        content == null

    ) {

        return "";

    }

    String cleaned =

        content

        .replaceAll(
            "<[^>]*>",
            ""
        )

        .replaceAll(
            "&[^;]+;",
            "'"
        )

        .replaceAll(
            "\\s+",
            " "
        )

        .trim();

    String lower =
        cleaned
        .toLowerCase();

    /*
    FIREBASE
    */

    if (

        containsAny(

            lower,

            "expire",

            "expiring"

        )

    ) {

        return
        "Access or service is expiring soon. Review before deadline.";

    }

    /*
    INTERVIEW
    */

    if (

        containsAny(

            lower,

            "interview",

            "reservation"

        )

    ) {

        return
        "Interview invitation received.";

    }

    /*
    SECURITY
    */

    if (

        containsAny(

            lower,

            "login",

            "sign-in",

            "security"

        )

    ) {

        return
        "Security-related activity detected.";

    }

    /*
    BILL
    */

    if (

        containsAny(

            lower,

            "invoice",

            "payment",

            "due"

        )

    ) {

        return
        "Payment or billing action may be required.";

    }

    /*
    WORK
    */

    if (

        containsAny(

            lower,

            "career",

            "job",

            "talent"

        )

    ) {

        return
        "Career-related update received.";

    }

    /*
    DEFAULT
    */

    return cleaned.substring(

        0,

        Math.min(
            100,
            cleaned.length()
        )

    );

}


private String detectWorkTitle(
    String lower
) {

    if (
        lower.contains(
            "interview"
        )
    )
        return "Interview";

    if (
        lower.contains(
            "application"
        )
    )
        return "Application";

    return "Career";

}

    /*
    --------------------------------
    GET EMAILS
    --------------------------------
    */
    @PostMapping("/emails")
public List<EmailResponse> getEmails(

    @RequestBody
    Map<String, String> body

)

throws Exception

{

    String code =
        body.get(
            "code"
        );

        String codeVerifier =
        body.get(
            "codeVerifier"
        );

    if ( code == null || codeVerifier == null){

        throw new RuntimeException(

            "No authorization code received"

        );

    }

    System.out.println(
    "CODE: "
    +
    code
);

System.out.println(
    "VERIFIER: "
    +
    codeVerifier
);

    List<String> emails =

        gmailService
            .fetchEmails(
                code,
                codeVerifier
            );

    List<EmailResponse> results =

        new ArrayList<>();

    for ( String email : emails ) {

    EmailResponse parsed = extractEmail( new EmailRequest( email ) );

    if ( parsed != null ){

        results.add( parsed );

    }

}

    return results;

}


    /*
    --------------------------------
    TRACK PARCEL
    --------------------------------
    */

    @GetMapping("/track/{tracking}")
    public Map track(
        @PathVariable String tracking
    ) {

        return trackingService.track(
            tracking
        );

    }

}