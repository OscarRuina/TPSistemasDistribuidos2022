package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    //Optional<Product> findByNameIgnoreCase(String name);
    List<Product> findByUser_Id(Long userId);

    List<Product> findByUser_IdIsNot(Long userId);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:name%")
    List<Product> findAllProductsByName(
            @Param("name") String name
    );

    @Query("SELECT p FROM Product p WHERE p.category = :category")
    List<Product> findAllProductsByCategory(
            @Param("category") String category
    );

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :priceMin AND :priceMax")
    List<Product> findAllProductsByPrice(
            @Param("priceMin") double priceMin,
            @Param("priceMax") double priceMax
    );
    @Query("SELECT p FROM Product p WHERE p.date BETWEEN :dateMin AND :dateMax")
    List<Product> findAllProductsByDate(
            @Param("dateMin") LocalDate dateMin,
            @Param("dateMax") LocalDate dateMax
    );


}
