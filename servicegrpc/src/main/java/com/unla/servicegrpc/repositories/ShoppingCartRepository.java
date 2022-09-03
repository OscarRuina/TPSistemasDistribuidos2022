package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.ShoppingCart;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart,Long> {

}
