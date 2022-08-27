package com.unla.servicegrpc.models.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;

@JsonRootName("wallet")
@Getter
@Setter
public class ResponseWalletDTO {

    private long id;

    private double balance;

    @JsonProperty("user")
    private ResponseUserDTO user;

}
