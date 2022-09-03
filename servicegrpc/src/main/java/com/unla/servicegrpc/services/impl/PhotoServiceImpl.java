package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.models.database.Photo;
import com.unla.servicegrpc.repositories.PhotoRepository;
import com.unla.servicegrpc.repositories.ProductRepository;
import com.unla.servicegrpc.services.IPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceImpl implements IPhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    @Override
    public List<Photo> findByProduct_Id(long productId) {

        return photoRepository.findByProduct_Id(productId);
    }
}
