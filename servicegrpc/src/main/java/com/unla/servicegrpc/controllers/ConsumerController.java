package com.unla.servicegrpc.controllers;

import com.unla.servicegrpc.services.IConsumerMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @GetMapping(value = "/messages", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getMessages(@RequestParam String topic, @RequestParam String groupId) {
        return new ResponseEntity<>(consumerMessages.getTopic(groupId,topic), HttpStatus.OK);
    }

}
