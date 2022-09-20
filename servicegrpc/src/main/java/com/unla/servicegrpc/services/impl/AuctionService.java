package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.models.database.Auction;
import com.unla.servicegrpc.models.database.Product;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestAuctionDTO;
import com.unla.servicegrpc.repositories.AuctionRepository;
import com.unla.servicegrpc.repositories.ProductRepository;
import com.unla.servicegrpc.repositories.UserRepository;
import com.unla.servicegrpc.services.IAuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuctionService implements IAuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Auction comprar(RequestAuctionDTO requestAuctionDTO) {
        User user = userRepository.findById(requestAuctionDTO.getUserId()).orElseThrow();
        Product product = productRepository.findById(requestAuctionDTO.getProductId())
                .orElseThrow();
        Auction auction = new Auction();
        auction.setDate(requestAuctionDTO.getDate());
        auction.setBuyer(user);
        auction.setProduct(product);
        auction.setTotal(requestAuctionDTO.getTotal());
        return auctionRepository.save(auction);
    }
}
