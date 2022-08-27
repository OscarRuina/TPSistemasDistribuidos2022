package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsernameIgnoreCase(String username);

}
