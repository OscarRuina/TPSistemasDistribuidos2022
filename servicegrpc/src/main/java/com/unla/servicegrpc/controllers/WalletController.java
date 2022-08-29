package com.unla.servicegrpc.controllers;

import com.unla.servicegrpc.services.IWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api/wallets")
@CrossOrigin(origins = {"*"}, maxAge = 3600)
public class WalletController {

    @Autowired
    private IWalletService walletService;

}
