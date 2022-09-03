package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestLoginUserDTO;
import com.unla.servicegrpc.models.request.RequestProductDTO;
import com.unla.servicegrpc.models.request.RequestUserDTO;
import com.unla.servicegrpc.models.response.ResponseProductDTO;

import java.time.LocalDate;
import java.util.List;

public interface IProductService {

    public Product findById(long productId);
    Product create(RequestProductDTO requestProductDTO);

    Product update(ResponseProductDTO requestProductDTO, long productId);

    List<Product> findByUserId(long userId);

    List<Product> findByNotUserId(long userId);

    List<Product> findByName(String name);

    List<Product> findByCategory(String category);

    List<Product> findByPrice(double priceMin, double priceMax);

    List<Product> findByDates(LocalDate dateInitial, LocalDate dateFinal);


}
