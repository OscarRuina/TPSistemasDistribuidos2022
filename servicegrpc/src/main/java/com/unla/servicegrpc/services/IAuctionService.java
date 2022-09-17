package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.Auction;
import com.unla.servicegrpc.models.request.RequestAuctionDTO;

public interface IAuctionService {

    Auction comprar(RequestAuctionDTO requestAuctionDTO);

}
