package com.unla.servicegrpc.models.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestAuctionDTO {

    private long userId;

    private long productId;

    private double total;

}
