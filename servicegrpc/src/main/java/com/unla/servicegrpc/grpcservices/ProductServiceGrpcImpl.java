package com.unla.servicegrpc.grpcservices;

import com.unla.servicegrpc.grpc.*;
import com.unla.servicegrpc.models.database.Photo;
import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestProductDTO;
import com.unla.servicegrpc.models.response.ResponseProductDTO;
import com.unla.servicegrpc.models.response.ResponseUserDTO;
import com.unla.servicegrpc.services.IPhotoService;
import com.unla.servicegrpc.services.IProductService;
import com.unla.servicegrpc.services.IUserService;
import io.grpc.stub.StreamObserver;
import java.time.LocalDateTime;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@GrpcService
public class ProductServiceGrpcImpl extends productGrpc.productImplBase {

    @Autowired
    private IProductService productService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IPhotoService photoService;

    @Override
    public void create(RequestProduct request, StreamObserver<ResponseProduct> responseObserver) {
        RequestProductDTO requestProductDTO = new RequestProductDTO();
        requestProductDTO.setName(request.getName());
        requestProductDTO.setCategory(request.getCategory());
        requestProductDTO.setQuantity(request.getQuantity());
        requestProductDTO.setPrice(request.getPrice());
        requestProductDTO.setDate(LocalDate.parse(request.getDate()));
        requestProductDTO.setUserId(request.getUserId());
        requestProductDTO.setAt_auction(request.getAtAuction());
        requestProductDTO.setActual_price_auction(request.getActualPrice());
        requestProductDTO.setFinalDateAuction(LocalDateTime.parse(request.getFinalDate()));
        List<Photo> photosList = new ArrayList<>();
        for (int k = 0; k < request.getPhotosCount(); k++) {
            Photo photoToAdd = new Photo();
            photoToAdd.setUrl(request.getPhotosList().get(k).getUrl());
            photoToAdd.setOrden(request.getPhotosList().get(k).getOrder());
            photosList.add(photoToAdd);
        }
        requestProductDTO.setPhotos(photosList);

        Product product = productService.create(requestProductDTO);

        List<Photos> photos = new ArrayList<>();
        for (int i = 0; i < product.getPhotos().size(); i++) {
            Photos photoGrpcToAdd = Photos.newBuilder()
                    .setOrder(product.getPhotos().get(i).getOrden())
                    .setUrl(product.getPhotos().get(i).getUrl())
                    .build();

            photos.add(photoGrpcToAdd);
        }
        System.out.println(photos);
        ResponseProduct responseProduct = ResponseProduct.newBuilder()
                .setId(product.getId())
                .setName(product.getName())
                .setCategory(product.getCategory())
                .setQuantity(product.getQuantity())
                .setPrice(product.getPrice())
                .setDate(product.getDate().toString())
                .setAtAuction(product.isAuction())
                .setUserId(product.getUser().getId())
                .addAllPhotos(photos)
                .setDate(product.getDate().toString())
                .setActualPrice(product.getActual_price_auction())
                .build();

        responseObserver.onNext(responseProduct);
        responseObserver.onCompleted();
    }

    @Override
    public void update(ResponseProduct request,
            StreamObserver<UpdateResponseProduct> responseObserver) {
        ResponseProductDTO responseProductDTO = new ResponseProductDTO();
        responseProductDTO.setName(request.getName());
        responseProductDTO.setCategory(request.getCategory());
        responseProductDTO.setQuantity(request.getQuantity());
        responseProductDTO.setPrice(request.getPrice());
        responseProductDTO.setDate(LocalDate.parse(request.getDate()));
        responseProductDTO.setAt_auction(request.getAtAuction());
        responseProductDTO.setActual_price_auction(request.getActualPrice());
        responseProductDTO.setFinalDateAuction(LocalDateTime.parse(request.getFinalDate()));

        User user = userService.findById(request.getUserId());

        ResponseUserDTO responseUserDTO = new ResponseUserDTO();
        responseUserDTO.setId(user.getId());
        responseUserDTO.setName(user.getName());
        responseUserDTO.setLastname(user.getLastname());
        responseUserDTO.setUsername(user.getUsername());
        responseUserDTO.setEmail(user.getEmail());

        responseProductDTO.setUser(responseUserDTO);

        List<Photo> photosActual = photoService.findByProduct_Id(request.getId());

        responseProductDTO.setPhotos(photosActual);

        Product productNow = productService.findById(request.getId());

        System.out.println(responseProductDTO.getPhotos());
        Product product = productService.update(responseProductDTO, request.getId());

        List<Photos> photos = new ArrayList<>();
        for (int i = 0; i < product.getPhotos().size(); i++) {
            Photos photoGrpcToAdd = Photos.newBuilder()
                    .setOrder(product.getPhotos().get(i).getOrden())
                    .setUrl(product.getPhotos().get(i).getUrl())
                    .build();

            photos.add(photoGrpcToAdd);
        }
        UpdateResponseProduct updateResponseProduct = UpdateResponseProduct.newBuilder()
                .setId(product.getId())
                .setName(product.getName())
                .setCategory(product.getCategory())
                .setQuantity(product.getQuantity())
                .setPrice(product.getPrice())
                .setDate(product.getDate().toString())
                .setAtAuction(product.isAuction())
                .setUserId(product.getUser().getId())
                .addAllPhotos(photos)
                .setDate(product.getDate().toString())
                .setActualPrice(product.getActual_price_auction())
                .setNameOld(productNow.getName())
                .setPriceOld(productNow.getPrice())
                .build();

        responseObserver.onNext(updateResponseProduct);
        responseObserver.onCompleted();
    }

    @Override
    public void getProductByUserId(RequestProductByUserId request,
            StreamObserver<getProducts> responseObserver) {
        List<Product> products = productService.findByUserId(request.getUserId());
        List<ProductObject> productGrpcList = new ArrayList<>();

        for (int i = 0; i < products.size(); i++) {

            List<Photos> photosData = new ArrayList<>();
            for (int j = 0; j < products.get(i).getPhotos().size(); j++) {
                Photos photoGrpcToAdd = Photos.newBuilder()
                        .setOrder(products.get(i).getPhotos().get(j).getOrden())
                        .setUrl(products.get(i).getPhotos().get(j).getUrl())
                        .build();
                photosData.add(photoGrpcToAdd);
            }

            ProductObject productToAdd = ProductObject.newBuilder()
                    .setId(products.get(i).getId())
                    .setName(products.get(i).getName())
                    .setCategory(products.get(i).getCategory())
                    .setPrice(products.get(i).getPrice())
                    .setQuantity(products.get(i).getQuantity())
                    .setDate(products.get(i).getDate().toString())
                    .setAtAuction(products.get(i).isAuction())
                    .addAllPhotos(photosData)
                    .setUserId(products.get(i).getUser().getId())
                    .build();

            productGrpcList.add(productToAdd);
        }

        getProducts getProducts = com.unla.servicegrpc.grpc.getProducts.newBuilder()
                .addAllProducts(productGrpcList)
                .build();

        responseObserver.onNext(getProducts);
        responseObserver.onCompleted();
    }

    @Override
    public void getProductsDistinctByUserId(RequestProductByUserId request,
            StreamObserver<getProducts> responseObserver) {
        List<Product> products = productService.findByNotUserId(request.getUserId());
        List<ProductObject> productGrpcList = new ArrayList<>();

        for (int i = 0; i < products.size(); i++) {

            List<Photos> photosData = new ArrayList<>();
            for (int j = 0; j < products.get(i).getPhotos().size(); j++) {
                Photos photoGrpcToAdd = Photos.newBuilder()
                        .setOrder(products.get(i).getPhotos().get(j).getOrden())
                        .setUrl(products.get(i).getPhotos().get(j).getUrl())
                        .build();
                photosData.add(photoGrpcToAdd);
            }

            ProductObject productToAdd = ProductObject.newBuilder()
                    .setId(products.get(i).getId())
                    .setName(products.get(i).getName())
                    .setCategory(products.get(i).getCategory())
                    .setPrice(products.get(i).getPrice())
                    .setQuantity(products.get(i).getQuantity())
                    .setDate(products.get(i).getDate().toString())
                    .setAtAuction(products.get(i).isAuction())
                    .addAllPhotos(photosData)
                    .setUserId(products.get(i).getUser().getId())
                    .build();

            productGrpcList.add(productToAdd);
        }

        getProducts getProducts = com.unla.servicegrpc.grpc.getProducts.newBuilder()
                .addAllProducts(productGrpcList)
                .build();

        responseObserver.onNext(getProducts);
        responseObserver.onCompleted();
    }

    @Override
    public void getProductsInAuctionByUserId(RequestProductByUserId request,
            StreamObserver<getProducts> responseObserver) {
        List<Product> products = productService.findByNotUserIdAuctionTrue(request.getUserId());
        List<ProductObject> productGrpcList = new ArrayList<>();

        for (int i = 0; i < products.size(); i++) {

            List<Photos> photosData = new ArrayList<>();
            for (int j = 0; j < products.get(i).getPhotos().size(); j++) {
                Photos photoGrpcToAdd = Photos.newBuilder()
                        .setOrder(products.get(i).getPhotos().get(j).getOrden())
                        .setUrl(products.get(i).getPhotos().get(j).getUrl())
                        .build();
                photosData.add(photoGrpcToAdd);
            }

            ProductObject productToAdd = ProductObject.newBuilder()
                    .setId(products.get(i).getId())
                    .setName(products.get(i).getName())
                    .setCategory(products.get(i).getCategory())
                    .setPrice(products.get(i).getPrice())
                    .setQuantity(products.get(i).getQuantity())
                    .setDate(products.get(i).getDate().toString())
                    .setAtAuction(products.get(i).isAuction())
                    .addAllPhotos(photosData)
                    .setUserId(products.get(i).getUser().getId())
                    .build();

            productGrpcList.add(productToAdd);
        }

        getProducts getProducts = com.unla.servicegrpc.grpc.getProducts.newBuilder()
                .addAllProducts(productGrpcList)
                .build();

        responseObserver.onNext(getProducts);
        responseObserver.onCompleted();

    }

    @Override
    public void getProductByUserIdPurchase(RequestProductByUserId request,
            StreamObserver<getProducts> responseObserver) {
        List<Product> products = productService.findByUserIdPurchase(request.getUserId());
        List<ProductObject> productGrpcList = new ArrayList<>();

        for (int i = 0; i < products.size(); i++) {

            List<Photos> photosData = new ArrayList<>();
            for (int j = 0; j < products.get(i).getPhotos().size(); j++) {
                Photos photoGrpcToAdd = Photos.newBuilder()
                        .setOrder(products.get(i).getPhotos().get(j).getOrden())
                        .setUrl(products.get(i).getPhotos().get(j).getUrl())
                        .build();
                photosData.add(photoGrpcToAdd);
            }

            ProductObject productToAdd = ProductObject.newBuilder()
                    .setId(products.get(i).getId())
                    .setName(products.get(i).getName())
                    .setCategory(products.get(i).getCategory())
                    .setPrice(products.get(i).getPrice())
                    .setQuantity(products.get(i).getQuantity())
                    .setDate(products.get(i).getDate().toString())
                    .setAtAuction(products.get(i).isAuction())
                    .addAllPhotos(photosData)
                    .setUserId(products.get(i).getUser().getId())
                    .build();

            productGrpcList.add(productToAdd);
        }

        getProducts getProducts = com.unla.servicegrpc.grpc.getProducts.newBuilder()
                .addAllProducts(productGrpcList)
                .build();

        responseObserver.onNext(getProducts);
        responseObserver.onCompleted();
    }

    @Override
    public void getProductByName(RequestProductByName request,
            StreamObserver<getProducts> responseObserver) {
        List<Product> products = productService.findByName(request.getName());
        List<ProductObject> productGrpcList = new ArrayList<>();

        for (int i = 0; i < products.size(); i++) {

            List<Photos> photosData = new ArrayList<>();
            for (int j = 0; j < products.get(i).getPhotos().size(); j++) {
                Photos photoGrpcToAdd = Photos.newBuilder()
                        .setOrder(products.get(i).getPhotos().get(j).getOrden())
                        .setUrl(products.get(i).getPhotos().get(j).getUrl())
                        .build();
                photosData.add(photoGrpcToAdd);
            }

            ProductObject productToAdd = ProductObject.newBuilder()
                    .setId(products.get(i).getId())
                    .setName(products.get(i).getName())
                    .setCategory(products.get(i).getCategory())
                    .setPrice(products.get(i).getPrice())
                    .setQuantity(products.get(i).getQuantity())
                    .setDate(products.get(i).getDate().toString())
                    .setAtAuction(products.get(i).isAuction())
                    .addAllPhotos(photosData)
                    .setUserId(products.get(i).getUser().getId())
                    .build();

            productGrpcList.add(productToAdd);
        }

        getProducts getProducts = com.unla.servicegrpc.grpc.getProducts.newBuilder()
                .addAllProducts(productGrpcList)
                .build();

        responseObserver.onNext(getProducts);
        responseObserver.onCompleted();
    }

    @Override
    public void getProductByCategory(RequestProductByCategory request,
            StreamObserver<getProducts> responseObserver) {
        List<Product> products = productService.findByCategory(request.getCategory());
        List<ProductObject> productGrpcList = new ArrayList<>();

        for (int i = 0; i < products.size(); i++) {

            List<Photos> photosData = new ArrayList<>();
            for (int j = 0; j < products.get(i).getPhotos().size(); j++) {
                Photos photoGrpcToAdd = Photos.newBuilder()
                        .setOrder(products.get(i).getPhotos().get(j).getOrden())
                        .setUrl(products.get(i).getPhotos().get(j).getUrl())
                        .build();
                photosData.add(photoGrpcToAdd);
            }

            ProductObject productToAdd = ProductObject.newBuilder()
                    .setId(products.get(i).getId())
                    .setName(products.get(i).getName())
                    .setCategory(products.get(i).getCategory())
                    .setPrice(products.get(i).getPrice())
                    .setQuantity(products.get(i).getQuantity())
                    .setDate(products.get(i).getDate().toString())
                    .setAtAuction(products.get(i).isAuction())
                    .addAllPhotos(photosData)
                    .setUserId(products.get(i).getUser().getId())
                    .build();

            productGrpcList.add(productToAdd);
        }

        getProducts getProducts = com.unla.servicegrpc.grpc.getProducts.newBuilder()
                .addAllProducts(productGrpcList)
                .build();

        responseObserver.onNext(getProducts);
        responseObserver.onCompleted();
    }

    @Override
    public void getProductByPrices(RequestProductByPrices request,
            StreamObserver<getProducts> responseObserver) {
        List<Product> products = productService.findByPrice(request.getPriceMin(),
                request.getPriceMax());
        List<ProductObject> productGrpcList = new ArrayList<>();

        for (int i = 0; i < products.size(); i++) {

            List<Photos> photosData = new ArrayList<>();
            for (int j = 0; j < products.get(i).getPhotos().size(); j++) {
                Photos photoGrpcToAdd = Photos.newBuilder()
                        .setOrder(products.get(i).getPhotos().get(j).getOrden())
                        .setUrl(products.get(i).getPhotos().get(j).getUrl())
                        .build();
                photosData.add(photoGrpcToAdd);
            }

            ProductObject productToAdd = ProductObject.newBuilder()
                    .setId(products.get(i).getId())
                    .setName(products.get(i).getName())
                    .setCategory(products.get(i).getCategory())
                    .setPrice(products.get(i).getPrice())
                    .setQuantity(products.get(i).getQuantity())
                    .setDate(products.get(i).getDate().toString())
                    .setAtAuction(products.get(i).isAuction())
                    .addAllPhotos(photosData)
                    .setUserId(products.get(i).getUser().getId())
                    .build();

            productGrpcList.add(productToAdd);
        }

        getProducts getProducts = com.unla.servicegrpc.grpc.getProducts.newBuilder()
                .addAllProducts(productGrpcList)
                .build();

        responseObserver.onNext(getProducts);
        responseObserver.onCompleted();
    }

    @Override
    public void getProductByDates(RequestProductByDates request,
            StreamObserver<getProducts> responseObserver) {
        List<Product> products = productService.findByDates(
                LocalDate.parse(request.getDateInitial()), LocalDate.parse(request.getDateFinal()));
        List<ProductObject> productGrpcList = new ArrayList<>();

        for (int i = 0; i < products.size(); i++) {

            List<Photos> photosData = new ArrayList<>();
            for (int j = 0; j < products.get(i).getPhotos().size(); j++) {
                Photos photoGrpcToAdd = Photos.newBuilder()
                        .setOrder(products.get(i).getPhotos().get(j).getOrden())
                        .setUrl(products.get(i).getPhotos().get(j).getUrl())
                        .build();
                photosData.add(photoGrpcToAdd);
            }

            ProductObject productToAdd = ProductObject.newBuilder()
                    .setId(products.get(i).getId())
                    .setName(products.get(i).getName())
                    .setCategory(products.get(i).getCategory())
                    .setPrice(products.get(i).getPrice())
                    .setQuantity(products.get(i).getQuantity())
                    .setDate(products.get(i).getDate().toString())
                    .setAtAuction(products.get(i).isAuction())
                    .addAllPhotos(photosData)
                    .setUserId(products.get(i).getUser().getId())
                    .build();

            productGrpcList.add(productToAdd);
        }

        getProducts getProducts = com.unla.servicegrpc.grpc.getProducts.newBuilder()
                .addAllProducts(productGrpcList)
                .build();

        responseObserver.onNext(getProducts);
        responseObserver.onCompleted();
    }
}
