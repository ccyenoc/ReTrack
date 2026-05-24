package com.retrack.backend.service;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.retrack.backend.config.Config;

@Service
public class TrackingService {

    private final Config config;

    public TrackingService(
        Config config
    ) {
        this.config =
            config;
    }

    public Map track(

        String tracking

    ) {

        RestTemplate rest =
            new RestTemplate();

        HttpHeaders headers =
            new HttpHeaders();

        headers.setContentType(

            MediaType.APPLICATION_FORM_URLENCODED

        );

        MultiValueMap<String,String>
        body =

            new LinkedMultiValueMap<>();

        body.add(

            "api",

            config.getApi()

        );

        body.add(

            "bulk[0][awb_no]",

            tracking.trim()

        );

        HttpEntity<
            MultiValueMap<String,String>
        >

        request =

            new HttpEntity<>(

                body,

                headers

            );

        ResponseEntity<Map>
        response =

            rest.postForEntity(

                "https://connect.easyparcel.my/?ac=EPTrackingBulk",

                request,

                Map.class

            );

        System.out.println(
            response.getBody()
        );

        return
            response.getBody();

    }

}