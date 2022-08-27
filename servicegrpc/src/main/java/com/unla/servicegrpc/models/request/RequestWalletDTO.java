package com.unla.servicegrpc.models.request;

import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestWalletDTO {

    private double balance;

    private long userId;

}
