package com.unla.servicegrpc.models.response;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

@JsonRootName("user")
@Getter
@Setter
public class ResponseLoginDTO {

    private long id;
    private String username;

}
