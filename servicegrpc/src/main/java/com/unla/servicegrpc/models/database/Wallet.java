package com.unla.servicegrpc.models.database;

import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
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
@Table(name = "WALLET")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "balance", nullable = false)
    private double balance;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @OneToOne(mappedBy = "wallet" , cascade = CascadeType.ALL)
    private User user;

}
