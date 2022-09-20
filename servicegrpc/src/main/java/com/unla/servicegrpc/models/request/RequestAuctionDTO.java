package com.unla.servicegrpc.models.request;

import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
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

    private LocalDate date;

    private long productId;

    private double total;

}