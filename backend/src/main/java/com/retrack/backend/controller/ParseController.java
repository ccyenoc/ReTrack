package com.retrack.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ParseController {

    @PostMapping("/parse-emails")
    public List<Map<String, Object>> parseEmails(@RequestBody Map<String, List<String>> request) {

        List<String> emails = request.get("emails");
        List<Map<String, Object>> results = new ArrayList<>();

        if (emails == null) return results;

        for (String text : emails) {
            String lower = text.toLowerCase();
            Map<String, Object> item = new HashMap<>();

            // 📦 Parcel detection
            if (text.contains("JT")) {
                item.put("type", "parcel");
                item.put("title", "Parcel Detected");
                item.put("subtitle", extractTracking(text));
                item.put("status", "In Transit");
                results.add(item);
                continue;
            }

            // 💳 Billing detection
            if (lower.contains("bill") || lower.contains("payment") || lower.contains("rm")) {
                item.put("type", "bill");
                item.put("title", "Bill Due");
                item.put("subtitle", "Payment reminder");
                results.add(item);
                continue;
            }

            // 💼 Work detection
            if (lower.contains("meeting") || lower.contains("schedule")) {
                item.put("type", "work");
                item.put("title", "Work Event");
                item.put("subtitle", "Meeting detected");
                results.add(item);
                continue;
            }

            // 🔐 OTP / alert detection (extra for demo 🔥)
            if (lower.contains("otp") || lower.contains("code")) {
                item.put("type", "alert");
                item.put("title", "Security Alert");
                item.put("subtitle", "OTP detected");
                results.add(item);
            }
        }

        return results;
    }

    private String extractTracking(String text) {
        Pattern pattern = Pattern.compile("JT\\d+");
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group() : "";
    }
}