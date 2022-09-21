package com.unla.servicegrpc.controllers;

import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("api/consumer")
@CrossOrigin(origins = {"*"}, maxAge = 3600)
public class ConsumerController {

    @GetMapping("/messages")
    public String getMessages(@RequestParam String topic, @RequestParam String groupId) {
        String url = "http://127.0.0.1:5000/messages?groupId=" + groupId + "&topic=" + topic;
        RestTemplate restTemplate = new RestTemplate();
        String messages = restTemplate.getForObject(url,String.class);
        return messages;
    }

}
