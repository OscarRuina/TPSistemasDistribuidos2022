package com.unla.servicegrpc.models.request;

import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestLoginUserDTO {

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String username;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    private String password;


}
