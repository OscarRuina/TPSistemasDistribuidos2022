package com.unla.servicegrpc.grpcservices;

import com.unla.servicegrpc.grpc.RegisterAuction;
import com.unla.servicegrpc.grpc.ResponseAuction;
import com.unla.servicegrpc.grpc.auctionGrpc;
import com.unla.servicegrpc.models.database.Auction;
import com.unla.servicegrpc.models.request.RequestAuctionDTO;
import com.unla.servicegrpc.services.IAuctionService;
import com.unla.servicegrpc.services.IProductService;
import com.unla.servicegrpc.services.IUserService;
import io.grpc.stub.StreamObserver;
import java.time.LocalDate;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

@GrpcService
public class AuctionServiceGrpcImpl extends auctionGrpc.auctionImplBase{

    @Autowired
    private IAuctionService auctionService;

    @Override
    public void comprar(RegisterAuction request, StreamObserver<ResponseAuction> responseObserver) {
        RequestAuctionDTO requestAuctionDTO = new RequestAuctionDTO();
        requestAuctionDTO.setDate(LocalDate.parse(request.getDate()));
        requestAuctionDTO.setUserId(request.getUserId());
        requestAuctionDTO.setProductId(request.getProductId());
        requestAuctionDTO.setTotal(request.getTotal());

        Auction auction = auctionService.comprar(requestAuctionDTO);

        ResponseAuction responseAuction = ResponseAuction.newBuilder()
                .setId(auction.getId())
                .setDate(auction.getDate().toString())
                .setUserId(auction.getBuyer().getId())
                .setProductId(auction.getProduct().getId())
                .setTotal(auction.getTotal())
                .build();

        responseObserver.onNext(responseAuction);
        responseObserver.onCompleted();
    }
}
