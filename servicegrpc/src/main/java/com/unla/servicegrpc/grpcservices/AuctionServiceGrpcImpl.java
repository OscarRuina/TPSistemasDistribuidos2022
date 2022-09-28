package com.unla.servicegrpc.grpcservices;

import com.unla.servicegrpc.grpc.ListAuction;
import com.unla.servicegrpc.grpc.RegisterAuction;
import com.unla.servicegrpc.grpc.RequestUserId;
import com.unla.servicegrpc.grpc.ResponseAuction;
import com.unla.servicegrpc.grpc.auctionGrpc;
import com.unla.servicegrpc.models.database.Auction;
import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.request.RequestAuctionDTO;
import com.unla.servicegrpc.services.IAuctionService;
import com.unla.servicegrpc.services.IProductService;
import com.unla.servicegrpc.services.IUserService;
import io.grpc.stub.StreamObserver;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
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
        String str = request.getDateFinished();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime localDateTime = LocalDateTime.parse(str,formatter);
        requestAuctionDTO.setDateFinished(localDateTime);

        Auction auction = auctionService.comprar(requestAuctionDTO);

        ResponseAuction responseAuction = ResponseAuction.newBuilder()
                .setId(auction.getId())
                .setDate(auction.getDate().toString())
                .setUserId(auction.getBuyer().getId())
                .setProductId(auction.getProduct().getId())
                .setTotal(auction.getTotal())
                .setDateFinished(auction.getDateFinished().toString())
                .build();

        responseObserver.onNext(responseAuction);
        responseObserver.onCompleted();
    }

    @Override
    public void getAuctionsByUserPurchase(RequestUserId request,
            StreamObserver<ListAuction> responseObserver) {
        List<Auction> auctions = auctionService.findAllByUserId(request.getUserId());
        List<ResponseAuction> responseAuctions = new ArrayList<>();
        auctions.forEach(auction -> {
            ResponseAuction responseAuction = ResponseAuction.newBuilder()
                    .setId(auction.getId())
                    .setDate(auction.getDate().toString())
                    .setUserId(auction.getBuyer().getId())
                    .setProductId(auction.getProduct().getId())
                    .setTotal(auction.getTotal())
                    .setDateFinished(auction.getDateFinished().toString())
                    .build();
            responseAuctions.add(responseAuction);
        });
        ListAuction listAuction = ListAuction.newBuilder()
                .addAllAuctions(responseAuctions)
                .build();

        responseObserver.onNext(listAuction);
        responseObserver.onCompleted();
    }
}
