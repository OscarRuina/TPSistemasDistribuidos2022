package com.unla.servicegrpc.grpcservices;


import com.unla.servicegrpc.grpc.Empty;
import com.unla.servicegrpc.grpc.GetById;
import com.unla.servicegrpc.grpc.LoginRequest;
import com.unla.servicegrpc.grpc.LoginResponse;
import com.unla.servicegrpc.grpc.LogoutResponse;
import com.unla.servicegrpc.grpc.RegisterRequest;
import com.unla.servicegrpc.grpc.RegisterResponse;
import com.unla.servicegrpc.grpc.userGrpc;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestLoginUserDTO;
import com.unla.servicegrpc.models.request.RequestUserDTO;
import com.unla.servicegrpc.models.response.ResponseLogoutDTO;
import com.unla.servicegrpc.services.IUserService;
import com.unla.servicegrpc.services.impl.UserServiceImpl;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

@GrpcService
public class UserServiceGrpcImpl extends userGrpc.userImplBase {

    @Autowired
    private IUserService userService;

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

    @Override
    public void login(LoginRequest request, StreamObserver<LoginResponse> responseObserver) {
        RequestLoginUserDTO requestLoginUserDTO = new RequestLoginUserDTO();
        requestLoginUserDTO.setUsername(request.getUsername());
        requestLoginUserDTO.setPassword(request.getPassword());

        User user = userService.login(requestLoginUserDTO);

        LoginResponse loginResponse = LoginResponse.newBuilder()
                .setId(user.getId())
                .setUsername(user.getUsername())
                .build();

        responseObserver.onNext(loginResponse);
        responseObserver.onCompleted();

    }

    @Override
    public void logout(Empty request, StreamObserver<LogoutResponse> responseObserver) {
        ResponseLogoutDTO responseLogoutDTO = userService.logout();
        LogoutResponse logoutResponse = LogoutResponse.newBuilder()
                .setMessage(responseLogoutDTO.getMessage())
                .build();
        responseObserver.onNext(logoutResponse);
        responseObserver.onCompleted();

    }
}
