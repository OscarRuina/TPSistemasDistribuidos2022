package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.database.ShoppingCart;
import com.unla.servicegrpc.models.database.ShoppingCartProducts;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestShoppingCartDTO;
import com.unla.servicegrpc.repositories.ShoppingCartRepository;
import com.unla.servicegrpc.services.IShoppingCartService;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import java.util.List;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ShoppingCartServiceImpl implements IShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public ShoppingCart findById(long shoppingCartId) {
        return shoppingCartRepository.findById(shoppingCartId).orElseThrow(
                () -> new ObjectNotFoundException(
                        CommonErrorMessages.OBJECT_NOT_FOUND,
                        CommonErrorMessages.OBJECT_NOT_FOUND_CODE
                )
        );
    }

    @Override
    public ShoppingCart comprar(RequestShoppingCartDTO requestShoppingCartDTO) {

        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setPurchaseDate(requestShoppingCartDTO.getPurchaseDate());
        shoppingCart.setUser(requestShoppingCartDTO.getUser());
        shoppingCart.setFinalPrice(requestShoppingCartDTO.getFinalPrice());
        for (ShoppingCartProducts shoppingCartProducts : requestShoppingCartDTO.getShoppingCartProducts()){
            shoppingCartProducts.setShoppingCart(shoppingCart);
        }
        shoppingCart.setShoppingCartProducts(requestShoppingCartDTO.getShoppingCartProducts());
        return shoppingCartRepository.save(shoppingCart);

    }

    @Override
    public List<ShoppingCart> getListUserId(long userId) {
        return shoppingCartRepository.findByUser_Id(userId);
    }
}
