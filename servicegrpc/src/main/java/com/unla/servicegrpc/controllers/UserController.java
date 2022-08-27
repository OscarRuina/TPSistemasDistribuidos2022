package com.unla.servicegrpc.controllers;

import com.unla.servicegrpc.models.request.RequestUserDTO;
import com.unla.servicegrpc.models.response.ResponseUserDTO;
import com.unla.servicegrpc.services.IUserService;
import com.unla.servicegrpc.utils.converters.UserConverter;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api/users")
@CrossOrigin(origins = {"*"}, maxAge = 3600)
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces =
            MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseUserDTO> create(
            @Valid @RequestBody RequestUserDTO requestUserDTO
    ) {
        return new ResponseEntity<>(
                UserConverter.toResponseUserDTO(userService.create(requestUserDTO)),
                HttpStatus.CREATED);
    }

    @GetMapping(value = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ResponseUserDTO> getUserById(
            @PathVariable("userId") @Pattern(regexp = "[0-9]+") String userId
    ) {
        return new ResponseEntity<>(
                UserConverter.toResponseUserDTO(
                        userService.findById(Long.parseLong(userId))
                ), HttpStatus.OK
        );
    }

}
