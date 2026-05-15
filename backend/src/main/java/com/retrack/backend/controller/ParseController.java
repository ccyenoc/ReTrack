package com.retrack.backend.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retrack.backend.model.EmailRequest;
import com.retrack.backend.model.EmailResponse;

@RestController
@RequestMapping("/api")
public class ParseController {

    @PostMapping("/extract-email")
    public EmailResponse extractEmail(@RequestBody EmailRequest request) {

        String content = request.getEmailContent();

        Pattern pattern = Pattern.compile("[A-Z]{2}\\d{9}MY");
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
}