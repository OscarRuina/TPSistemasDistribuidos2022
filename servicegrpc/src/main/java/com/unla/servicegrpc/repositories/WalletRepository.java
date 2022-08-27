package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.Wallet;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {

    Optional<Wallet> findByUser_Id(long userId);

}
