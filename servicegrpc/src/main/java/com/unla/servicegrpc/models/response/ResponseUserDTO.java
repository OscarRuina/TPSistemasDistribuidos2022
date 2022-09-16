package com.unla.servicegrpc.models.response;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

@JsonRootName("user")
@Getter
@Setter
public class ResponseUserDTO {

    private long id;
    private String name;
    private String lastname;
    private String email;
    private String username;
    private String role;

}
