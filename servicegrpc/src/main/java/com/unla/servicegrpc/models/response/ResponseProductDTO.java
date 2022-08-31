package com.unla.servicegrpc.models.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@JsonRootName("product")
@Getter
@Setter
public class ResponseProductDTO {

    private long id;

    private String name;

    private String category;

    private int quantity;

    private double price;

    private LocalDate date;

    @JsonProperty("user")
    private ResponseUserDTO user;



    /*faltan 2 datos pero no se si van aca fotos y carrito*/

}
