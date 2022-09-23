package com.unla.servicegrpc.controllers;

import com.unla.servicegrpc.services.IConsumerMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/consumer")
@CrossOrigin(origins = {"*"}, maxAge = 3600)
public class ConsumerController {

    @Autowired
    private IConsumerMessages consumerMessages;

    @GetMapping("/messages")
    public String getMessages(@RequestParam String topic, @RequestParam String groupId) {
        return consumerMessages.getTopic(groupId,topic);
    }

}
