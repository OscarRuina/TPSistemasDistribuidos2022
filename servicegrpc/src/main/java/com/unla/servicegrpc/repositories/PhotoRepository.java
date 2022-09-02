package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo,Long> {

}
