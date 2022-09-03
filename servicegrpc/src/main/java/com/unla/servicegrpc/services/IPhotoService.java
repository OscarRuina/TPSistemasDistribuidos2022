package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.Photo;
import com.unla.servicegrpc.models.database.Product;

import java.util.List;

public interface IPhotoService {

    List<Photo> findByProduct_Id(long productId);

}
