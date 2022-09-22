package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.Auction;
import com.unla.servicegrpc.models.request.RequestAuctionDTO;
import java.util.List;

public interface IAuctionService {

    Auction comprar(RequestAuctionDTO requestAuctionDTO);

    List<Auction> findAllByUserId(long userId);

}
