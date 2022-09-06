package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.database.Wallet;
import com.unla.servicegrpc.models.request.RequestWalletDTO;
import com.unla.servicegrpc.repositories.WalletRepository;
import com.unla.servicegrpc.services.IWalletService;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletServiceImpl implements IWalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public Wallet findByUserId(long userId) {
        return walletRepository.findByUser_Id(userId).orElseThrow(
                () -> new ObjectNotFoundException(
                        CommonErrorMessages.OBJECT_NOT_FOUND,
                        CommonErrorMessages.OBJECT_NOT_FOUND_CODE
                )
        );
    }

    @Override
    public Wallet addBalance(long userId, double balance) {
        Wallet wallet = findByUserId(userId);
        wallet.setBalance(wallet.getBalance() + balance);
        return walletRepository.save(wallet);
    }

    @Override
    public String subtractBalance(long userId, double balance)  {
        Wallet wallet = findByUserId(userId);
        double newBalance = wallet.getBalance() - balance;
        wallet.setBalance(newBalance);
        walletRepository.save(wallet);
        return "Operation Success";
    }

}
