package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.ShoppingCart;
import java.util.List;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart,Long> {

    List<ShoppingCart> findByUser_Id(long userId);

}
