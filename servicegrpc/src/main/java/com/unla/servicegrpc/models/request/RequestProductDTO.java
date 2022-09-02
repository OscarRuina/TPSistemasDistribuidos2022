package com.unla.servicegrpc.models.request;

import com.unla.servicegrpc.models.database.Photo;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestProductDTO {

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String name;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String category;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    private int quantity;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    private double price;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    private LocalDate date;

    private List<Photo> photos;

    private long userId;

}
