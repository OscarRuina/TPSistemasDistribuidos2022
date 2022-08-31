package com.unla.servicegrpc.grpcservices;

import com.unla.servicegrpc.grpc.RegisterResponse;
import com.unla.servicegrpc.grpc.RequestProduct;
import com.unla.servicegrpc.grpc.ResponseProduct;
import com.unla.servicegrpc.grpc.productGrpc;
import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.request.RequestProductDTO;
import com.unla.servicegrpc.services.IProductService;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

@GrpcService
public class ProductServiceGrpcImpl extends productGrpc.productImplBase{

    @Autowired
    private IProductService productService;

    @Override
    public void create(RequestProduct request, StreamObserver<ResponseProduct> responseObserver) {
        RequestProductDTO requestProductDTO = new RequestProductDTO();
        requestProductDTO.setName(request.getName());
        requestProductDTO.setCategory(request.getCategory());
        requestProductDTO.setQuantity(request.getQuantity());
        requestProductDTO.setPrice(request.getPrice());
        requestProductDTO.setDate(LocalDate.parse(request.getDate()));
        requestProductDTO.setUserId(request.getUserId());

        Product product = productService.create(requestProductDTO);

        ResponseProduct responseProduct = ResponseProduct.newBuilder()
                .setId(product.getId())
                .setName(product.getName())
                .setCategory(product.getCategory())
                .setQuantity(product.getQuantity())
                .setPrice(product.getPrice())
                .setDate(product.getDate().toString())
                .setUserId(product.getUser().getId())
                .build();

        responseObserver.onNext(responseProduct);
        responseObserver.onCompleted();
    }
}
