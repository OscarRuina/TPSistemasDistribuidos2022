package com.unla.servicegrpc.models.database;

import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
@Table(name = "PRODUCT")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "name", nullable = false)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String name;

    @NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "category", nullable = false)
    @Size(max = 250, message = CommonErrorMessages.MAX_SIZE_MESSAGE)
    private String category;

    //@NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "quantity", nullable = false)
    private int quantity;

    //@NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "price", nullable = false)
    private double price;

    //@NotBlank(message = CommonErrorMessages.REQUIRED_PARAM_MESSAGE)
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "at_auction", nullable = false)
    private boolean at_auction;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "product", cascade = CascadeType.ALL)
    private List<Photo> photos;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = {CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    private List<ShoppingCartProducts> shoppingCartProducts;

}
