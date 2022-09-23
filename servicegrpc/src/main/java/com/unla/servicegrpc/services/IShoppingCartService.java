package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.ShoppingCart;
import com.unla.servicegrpc.models.request.RequestShoppingCartDTO;
import java.util.List;

public interface IShoppingCartService {

    ShoppingCart comprar(RequestShoppingCartDTO requestShoppingCartDTO);

    List<ShoppingCart> getListUserId(long userId);

}
