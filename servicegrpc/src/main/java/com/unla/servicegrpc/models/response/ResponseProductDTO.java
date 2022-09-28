package com.unla.servicegrpc.models.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.unla.servicegrpc.models.database.Photo;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

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

    private boolean at_auction;

    //estaba en lista de string
    private List<Photo> photos;

    @JsonProperty("user")
    private ResponseUserDTO user;

    private LocalDate finalDateAuction;

    private double actual_price_auction;

    private String nameOld;

    private double priceOld;

}
