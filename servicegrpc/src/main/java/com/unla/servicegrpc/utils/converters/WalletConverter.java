package com.unla.servicegrpc.utils.converters;

import com.unla.servicegrpc.models.database.Wallet;
import com.unla.servicegrpc.models.response.ResponseWalletDTO;

public final class WalletConverter {

    private WalletConverter(){}

    public static ResponseWalletDTO toResponseWalletDTO(Wallet wallet){
        ResponseWalletDTO responseWalletDTO = new ResponseWalletDTO();
        responseWalletDTO.setId(wallet.getId());
        responseWalletDTO.setBalance(wallet.getBalance());
        responseWalletDTO.setUser(
                UserConverter.toResponseUserDTO(wallet.getUser())
        );
        return responseWalletDTO;
    }

}
