package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestLoginUserDTO;
import com.unla.servicegrpc.models.request.RequestProductDTO;
import com.unla.servicegrpc.models.request.RequestUserDTO;

import java.time.LocalDate;
import java.util.List;

public interface IProductService {

    Product create(RequestProductDTO requestProductDTO);

    Product modificar(RequestProductDTO requestProductDTO, long productId);

    List<Product> findByUserId(long userId);

    List<Product> findByName(String name);

    List<Product> findByCategory(String category);

    List<Product> findByPrice(int priceMin, int priceMax);

    List<Product> findByDates(LocalDate dateInitial, LocalDate dateFinal);


}
