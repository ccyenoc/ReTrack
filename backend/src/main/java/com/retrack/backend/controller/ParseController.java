// SpringBoot : Java framework which 

package com.retrack.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retrack.backend.model.EmailRequest;
import com.retrack.backend.model.EmailResponse;

@RestController // tell springboot that this class will be an api controller , return data in JSON (default will be webpages)
@RequestMapping("/api") //app endpoints will start with /api (base URL)
public class ParseController {

    @PostMapping("/extract-email") // HTTP method = POST , and the URL : /api/extract-email
    public EmailResponse extractEmail(@RequestBody EmailRequest request ) { //take JSON from the request and convert it into a JAVA object

        String content = request.getEmailContent();

        Pattern pattern = Pattern.compile("\\b[A-Z0-9]{8,20}\\b");
        /*
        \\b : word boundary
        [A-Z0-9] : letters + numbers
        {8,20} : length between 8-20
        */
        Matcher matcher = pattern.matcher(content);

        if (matcher.find()) {
            String tracking = matcher.group();

            return new EmailResponse(
                    "parcel",
                    "Parcel Detected",
                    tracking
            );
        }

        if (content.toLowerCase().contains("bill") || content.toLowerCase().contains("payment")) {
            return new EmailResponse(
                    "bill",
                    "Bill Due",
                    "Payment reminder"
            );
        }

        return new EmailResponse(
                "alert",
                "General Notification",
                content.substring(0, Math.min(content.length(), 30))
        );
    }

    // to receive an access token and return email content
    @PostMapping("/emails")
    public List<EmailResponse> getEmails(@RequestBody Map<String, String> body) { // receives JSON format

    /* Example of Map<String,String> body
        {
            "accessToken" : "abc123"
        }
    */

    String code = body.get("code");

    if (code == null) {
    throw new RuntimeException("No authorization code received");
    }

    System.out.println("Google auth code: " + code);

    List<String> emails = List.of(
    "Your parcel JT123456789MY is out for delivery",
    "Your electricity bill is due tomorrow",
    "Meeting scheduled with team",
    "New login detected"
);

    List<EmailResponse> results = new ArrayList<>();

    for (String email : emails) {
     results.add(extractEmail(new EmailRequest(email)));
    }


    return results; // this is where we get the response from server, and this will convert into json format
    // eg. ["A","B"]

}
}