package com.unla.servicegrpc.utils.converters;

import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.response.ResponseLoginDTO;
import com.unla.servicegrpc.models.response.ResponseUserDTO;

public final class UserConverter {

    private UserConverter(){}

    public static ResponseUserDTO toResponseUserDTO(User user){
        ResponseUserDTO responseUserDTO = new ResponseUserDTO();
        responseUserDTO.setId(user.getId());
        responseUserDTO.setName(user.getName());
        responseUserDTO.setLastname(user.getLastname());
        responseUserDTO.setEmail(user.getEmail());
        responseUserDTO.setUsername(user.getUsername());
        responseUserDTO.setRole(user.getRole());
        return responseUserDTO;
    }

    public static ResponseLoginDTO toResponseLoginDTO(User user){
        ResponseLoginDTO responseLoginDTO = new ResponseLoginDTO();
        responseLoginDTO.setId(user.getId());
        responseLoginDTO.setUsername(user.getUsername());
        responseLoginDTO.setRole(user.getRole());
        return responseLoginDTO;
    }

}
