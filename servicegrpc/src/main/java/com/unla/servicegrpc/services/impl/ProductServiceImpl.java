package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.models.database.Photo;
import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.database.ShoppingCart;
import com.unla.servicegrpc.models.database.ShoppingCartProducts;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestProductDTO;
import com.unla.servicegrpc.models.response.ResponseProductDTO;
import com.unla.servicegrpc.repositories.PhotoRepository;
import com.unla.servicegrpc.repositories.ProductRepository;
import com.unla.servicegrpc.repositories.ShoppingCartRepository;
import com.unla.servicegrpc.repositories.UserRepository;
import com.unla.servicegrpc.services.IProductService;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Override
    public Product findById(long productId) {
        return productRepository.findById(productId).orElseThrow(
                () -> new ObjectNotFoundException(
                        CommonErrorMessages.OBJECT_NOT_FOUND,
                        CommonErrorMessages.OBJECT_NOT_FOUND_CODE
                )
        );
    }

    public Product create(RequestProductDTO requestProductDTO){
        Product product = new Product();
        product.setName(requestProductDTO.getName());
        product.setCategory(requestProductDTO.getCategory());
        product.setPrice(requestProductDTO.getPrice());
        product.setQuantity(requestProductDTO.getQuantity());
        product.setDate(requestProductDTO.getDate());

        User user = userRepository.findById(requestProductDTO.getUserId()).orElseThrow();
        product.setUser(user);

        List<Photo> photos = new ArrayList<>();
        for (int i=0; i<requestProductDTO.getPhotos().size();i++){
            Photo photo = new Photo();
            photo.setUrl(requestProductDTO.getPhotos().get(i).getUrl());
            photo.setOrden(requestProductDTO.getPhotos().get(i).getOrden());
            photo.setProduct(product);
            photos.add(photo);
        }

        product.setPhotos(photos);

        return productRepository.save(product);

    }

    @Override
    public Product update(ResponseProductDTO responseProductDTO, long productId){

        Product product = findById(productId);
        product.setName(responseProductDTO.getName());
        product.setCategory(responseProductDTO.getCategory());
        product.setPrice(responseProductDTO.getPrice());
        product.setQuantity(responseProductDTO.getQuantity());
        product.setDate(responseProductDTO.getDate());

        //aca no limito si son 5, deberia hacerse desde front, no permitiendole subir mas de 5
        List<Photo> photos = product.getPhotos();
        for (int i=0; i<responseProductDTO.getPhotos().size();i++){
            if(photos.size() < i){
                Photo photo = new Photo();
                photo.setUrl(responseProductDTO.getPhotos().get(i).getUrl());
                photo.setOrden(responseProductDTO.getPhotos().get(i).getOrden());
                photo.setProduct(product);
                photos.add(photo);
            }else{
                //photos.get(i).setUrl(responseProductDTO.getPhotos().get(i));
            }
        }
        product.setPhotos(photos);

        System.out.println(product.getPhotos());

        for (int j=0;j<photos.size();j++){
            photoRepository.save(photos.get(j));
        }

        return productRepository.save(product);
    }

    @Override
    @Transactional
    public List<Product> findByUserId(long userId){
        return productRepository.findByUser_Id(userId);
    }

    @Override
    public List<Product> findByNotUserId(long userId) {
        return productRepository.findByUser_IdIsNot(userId);
    }

    @Override
    public List<Product> findByUserIdPurchase(long userId) {
        List<ShoppingCart> shoppingCarts = shoppingCartRepository.findByUser_Id(userId);
        List<Product> products = new ArrayList<>();
        for(ShoppingCart shoppingCart : shoppingCarts){
            for(ShoppingCartProducts shoppingCartProducts: shoppingCart.getShoppingCartProducts()){
                products.add(shoppingCartProducts.getProduct());
            }
        }
        return products;
    }

    @Override
    public List<Product> findByName(String name){
        return productRepository.findAllProductsByName(name);
    }

    @Override
    public List<Product> findByCategory(String category){
        return productRepository.findAllProductsByCategory(category);
    }

    @Override
    public List<Product> findByPrice(double priceMin, double priceMax){
        return productRepository.findAllProductsByPrice(priceMin, priceMax);
    }

    @Override
    public List<Product> findByDates(LocalDate dateInitial, LocalDate dateFinal){
        return productRepository.findAllProductsByDate(dateInitial, dateFinal);
    }

}
