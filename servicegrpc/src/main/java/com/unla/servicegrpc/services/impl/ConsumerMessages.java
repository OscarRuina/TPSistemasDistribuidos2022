package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.services.IConsumerMessages;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ConsumerMessages implements IConsumerMessages {

    @Override
    public String getTopic(String groupId, String topic) {
        String url = "http://127.0.0.1:5000/messages?groupId=" + groupId + "&topic=" + topic;
        RestTemplate restTemplate = new RestTemplate();
        String messages = restTemplate.getForObject(url,String.class);
        JSONObject json = new JSONObject(messages);
        String topic1 = json.getString("topic");
        /** Topics Name: products - auction - invoice **/
        /** auction: save the last auction **/
        /** invoice: save all in topic **/
        /** get list, key message to build object auction and invoice **/

        return messages;
    }
}
