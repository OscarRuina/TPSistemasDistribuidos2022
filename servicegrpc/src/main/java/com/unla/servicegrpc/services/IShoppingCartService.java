package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.ShoppingCart;
import com.unla.servicegrpc.models.request.RequestShoppingCartDTO;

public interface IShoppingCartService {

    ShoppingCart comprar(RequestShoppingCartDTO requestShoppingCartDTO);

}
