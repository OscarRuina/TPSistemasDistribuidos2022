package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.database.Wallet;
import com.unla.servicegrpc.models.request.RequestLoginUserDTO;
import com.unla.servicegrpc.models.request.RequestUserDTO;
import com.unla.servicegrpc.repositories.UserRepository;
import com.unla.servicegrpc.services.IUserService;
import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findById(long userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new ObjectNotFoundException(
                        CommonErrorMessages.OBJECT_NOT_FOUND,
                        CommonErrorMessages.OBJECT_NOT_FOUND_CODE
                )
        );
    }

    @Override
    public User create(RequestUserDTO requestUserDTO) {
        userRepository.findByUsernameIgnoreCase(requestUserDTO.getUsername()).ifPresent(
                user -> {
                    throw new RuntimeException(CommonErrorMessages.OBJECT_ALREADY_EXIST);
                }
        );
        User user = new User();
        user.setName(requestUserDTO.getName());
        user.setLastname(requestUserDTO.getLastname());
        user.setEmail(requestUserDTO.getEmail());
        user.setUsername(requestUserDTO.getUsername());
        user.setPassword(requestUserDTO.getPassword());
        Wallet wallet = new Wallet();
        wallet.setBalance(0);
        wallet.setUser(user);
        user.setWallet(wallet);
        return userRepository.save(user);
    }

    @Override
    public User login(RequestLoginUserDTO requestLoginUserDTO) {
        User user = userRepository.findByUsernameIgnoreCase(requestLoginUserDTO.getUsername()).orElseThrow(
                () -> new ObjectNotFoundException(
                        CommonErrorMessages.OBJECT_NOT_FOUND,
                        CommonErrorMessages.OBJECT_NOT_FOUND_CODE
                )
        );
        if(!user.getPassword().equals(requestLoginUserDTO.getPassword())){
            throw new RuntimeException(CommonErrorMessages.INCORRECT_PASSWORD);
        }
        return user;
    }

    @Override
    public String logout() {
        return "Logout Successfully";
    }
}
