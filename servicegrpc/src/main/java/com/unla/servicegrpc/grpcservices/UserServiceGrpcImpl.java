package com.unla.servicegrpc.grpcservices;


import com.unla.servicegrpc.grpc.GetById;
import com.unla.servicegrpc.grpc.RegisterRequest;
import com.unla.servicegrpc.grpc.RegisterResponse;
import com.unla.servicegrpc.grpc.userGrpc;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestUserDTO;
import com.unla.servicegrpc.services.impl.UserServiceImpl;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

@GrpcService
public class UserServiceGrpcImpl extends userGrpc.userImplBase {

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void register(RegisterRequest request,
            StreamObserver<RegisterResponse> responseObserver) {

        RequestUserDTO requestUserDTO = new RequestUserDTO();
        requestUserDTO.setName(request.getName());
        requestUserDTO.setLastname(request.getLastname());
        requestUserDTO.setEmail(request.getEmail());
        requestUserDTO.setUsername(request.getUsername());
        requestUserDTO.setPassword(request.getPassword());

        User user = userService.create(requestUserDTO);

        RegisterResponse registerResponse = RegisterResponse.newBuilder()
                .setId(user.getId())
                .setName(user.getName())
                .setLastname(user.getLastname())
                .setEmail(user.getEmail())
                .setUsername(user.getUsername())
                .build();

        responseObserver.onNext(registerResponse);
        responseObserver.onCompleted();

    }

    @Override
    public void get(GetById request, StreamObserver<RegisterResponse> responseObserver) {
        User user = userService.findById(request.getId());

        RegisterResponse registerResponse = RegisterResponse.newBuilder()
                .setId(user.getId())
                .setName(user.getName())
                .setLastname(user.getLastname())
                .setEmail(user.getEmail())
                .setUsername(user.getUsername())
                .build();

        responseObserver.onNext(registerResponse);
        responseObserver.onCompleted();
    }

}
