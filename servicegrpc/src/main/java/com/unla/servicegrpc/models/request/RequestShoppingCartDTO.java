package com.unla.servicegrpc.models.request;

import com.unla.servicegrpc.models.database.ShoppingCartProducts;
import com.unla.servicegrpc.models.database.User;
import java.time.LocalDate;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestShoppingCartDTO {

    private User user;

    private List<ShoppingCartProducts> shoppingCartProducts;

    private double finalPrice;

    private LocalDate purchaseDate;

}
