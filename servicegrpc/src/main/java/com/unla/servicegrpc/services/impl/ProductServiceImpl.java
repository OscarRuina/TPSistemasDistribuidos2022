package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.database.Wallet;
import com.unla.servicegrpc.models.request.RequestProductDTO;
import com.unla.servicegrpc.repositories.ProductRepository;
import com.unla.servicegrpc.repositories.UserRepository;
import com.unla.servicegrpc.services.IProductService;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Product findById(long productId) {
        return productRepository.findById(productId).orElseThrow(
                () -> new ObjectNotFoundException(
                        CommonErrorMessages.OBJECT_NOT_FOUND,
                        CommonErrorMessages.OBJECT_NOT_FOUND_CODE
                )
        );
    }

    @Override
    public Product create(RequestProductDTO requestProductDTO){
        Product product = new Product();
        product.setName(requestProductDTO.getName());
        product.setCategory(requestProductDTO.getCategory());
        product.setPrice(requestProductDTO.getPrice());
        product.setQuantity(requestProductDTO.getQuantity());
        product.setDate(requestProductDTO.getDate());
        //product.setPhotos(requestProductDTO.get);
        User user = userRepository.findById(requestProductDTO.getUserId()).orElseThrow();
        user.getP
        product.setUser(user);
        return productRepository.save(product);
    };

    @Override
    public Product modificar(RequestProductDTO requestProductDTO, long productId){
        Product product = findById(productId);
        product.setName(requestProductDTO.getName());
        product.setCategory(requestProductDTO.getCategory());
        product.setPrice(requestProductDTO.getPrice());
        product.setQuantity(requestProductDTO.getQuantity());
        product.setDate(requestProductDTO.getDate());
        return productRepository.save(product);
    };

    @Override
    public List<Product> findByUserId(long userId){
        return productRepository.findByUser_Id(userId);
    };

    @Override
    public List<Product> findByName(String name){
        return productRepository.findAllProductsForName(name);
    };

    @Override
    public List<Product> findByCategory(String category){
        return productRepository.findAllProductsForCategory(category);
    };

    @Override
    public List<Product> findByPrice(int priceMin, int priceMax){
        return productRepository.findAllProductsForPrice(priceMin, priceMax);
    };

    @Override
    public List<Product> findByDates(LocalDate dateInitial, LocalDate dateFinal){
        return productRepository.findAllProductsForDate(dateInitial, dateFinal);
    };

}
