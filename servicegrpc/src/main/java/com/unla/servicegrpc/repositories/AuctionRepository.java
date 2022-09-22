package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.Auction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction,Long> {

    List<Auction> findByBuyer_Id(long userId);

}
