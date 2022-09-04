package com.unla.servicegrpc.models.database;

import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "name", nullable = false)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String name;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "lastname", nullable = false)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String lastname;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Email(message = CommonErrorMessages.EMAIL_MESSAGE)
    @Column(name = "email",nullable = false, unique = true)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String email;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "username",nullable = false, unique = true)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String username;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "password",nullable = false)
    private String password;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Wallet wallet;

    @OneToMany(mappedBy = "user",cascade = {CascadeType.PERSIST,
            CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private List<Product> products;


}
