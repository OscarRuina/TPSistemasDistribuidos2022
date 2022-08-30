package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestLoginUserDTO;
import com.unla.servicegrpc.models.request.RequestUserDTO;

public interface IUserService {

    User findById(long userId);

    User create(RequestUserDTO requestUserDTO);

    User login(RequestLoginUserDTO requestLoginUserDTO);

    String logout();

}
