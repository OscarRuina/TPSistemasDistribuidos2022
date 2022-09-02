package com.unla.servicegrpc.services;

import com.unla.servicegrpc.models.database.Wallet;
import com.unla.servicegrpc.models.request.RequestWalletDTO;

public interface IWalletService {

    Wallet findByUserId(long userId);

    Wallet addBalance(long userId,double balance);

    String subtractBalance(long userId, double balance) throws Exception;

}
