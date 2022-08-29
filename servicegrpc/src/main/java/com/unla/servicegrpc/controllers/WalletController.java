package com.unla.servicegrpc.controllers;

import com.unla.servicegrpc.models.database.Wallet;
import com.unla.servicegrpc.models.request.RequestWalletDTO;
import com.unla.servicegrpc.models.response.ResponseWalletDTO;
import com.unla.servicegrpc.services.IWalletService;
import com.unla.servicegrpc.utils.converters.WalletConverter;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api/wallets")
@CrossOrigin(origins = {"*"}, maxAge = 3600)
public class WalletController {

    @Autowired
    private IWalletService walletService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE ,produces =
            MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseWalletDTO> create(
            @Valid @RequestBody RequestWalletDTO requestWalletDTO
    ){

        return new ResponseEntity<>(
                WalletConverter.toResponseWalletDTO(walletService.create(requestWalletDTO)),HttpStatus.CREATED
        );
    }

}
