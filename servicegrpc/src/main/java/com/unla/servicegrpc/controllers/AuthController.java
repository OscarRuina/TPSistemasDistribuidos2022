package com.unla.servicegrpc.controllers;

import com.unla.servicegrpc.models.request.RequestLoginUserDTO;
import com.unla.servicegrpc.models.request.RequestUserDTO;
import com.unla.servicegrpc.models.response.ResponseLoginDTO;
import com.unla.servicegrpc.models.response.ResponseUserDTO;
import com.unla.servicegrpc.services.IUserService;
import com.unla.servicegrpc.utils.converters.UserConverter;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"*"}, maxAge = 3600)
public class AuthController {

    @Autowired
    private IUserService userService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces =
            MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ResponseLoginDTO> login(
            @Valid @RequestBody RequestLoginUserDTO requestLoginUserDTO
    ) {
        return new ResponseEntity<>(
                UserConverter.toResponseLoginDTO(
                        userService.login(requestLoginUserDTO)
                ),HttpStatus.OK);
    }

}
