package com.unla.servicegrpc.grpcservices;

import com.unla.servicegrpc.grpc.RegisterRequestWallet;
import com.unla.servicegrpc.grpc.RegisterResponseWallet;
import com.unla.servicegrpc.grpc.ResponseAPIWallet;
import com.unla.servicegrpc.grpc.walletGrpc;
import com.unla.servicegrpc.models.database.Wallet;
import com.unla.servicegrpc.services.IWalletService;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

@GrpcService
public class WalletServiceGrpcImpl extends walletGrpc.walletImplBase{

    @Autowired
    private IWalletService walletService;

    @Override
    public void add(RegisterRequestWallet request,
            StreamObserver<RegisterResponseWallet> responseObserver) {

        double balance = request.getBalance();
        long userId = request.getUserId();

        Wallet wallet = walletService.addBalance(userId,balance);

        RegisterResponseWallet registerResponseWallet = RegisterResponseWallet.newBuilder()
                .setId(wallet.getId())
                .setBalance(wallet.getBalance())
                .setUserId(wallet.getUser().getId())
                .build();

        responseObserver.onNext(registerResponseWallet);
        responseObserver.onCompleted();


    }

    @Override
    public void subtract(RegisterRequestWallet request,
            StreamObserver<ResponseAPIWallet> responseObserver) {

        double balance = request.getBalance();
        long userId = request.getUserId();
        String message = "Operation Success";
        try{
            walletService.subtractBalance(userId,balance);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }

        ResponseAPIWallet responseAPIWallet = ResponseAPIWallet.newBuilder()
                .setMessage(message)
                .build();

        responseObserver.onNext(responseAPIWallet);
        responseObserver.onCompleted();

    }
}
