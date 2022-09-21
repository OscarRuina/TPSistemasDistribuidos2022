package com.unla.servicegrpc.controllers;

import org.json.JSONObject;
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
        JSONObject json = new JSONObject(messages);
        String topic1 = json.getString("topic");
        /** Topics Name: products - auction - invoice **/
        /** auction: save **/
        /** invoice: save **/
        return messages;
    }

}
