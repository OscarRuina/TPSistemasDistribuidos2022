package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.Photo;
import com.unla.servicegrpc.models.database.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo,Long> {

    List<Photo> findByProduct_Id(Long productId);
}
