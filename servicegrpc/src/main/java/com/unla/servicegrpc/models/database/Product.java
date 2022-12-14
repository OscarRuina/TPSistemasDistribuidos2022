package com.unla.servicegrpc.models.database;

import com.unla.servicegrpc.utils.messages.CommonErrorMessages;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
import org.hibernate.annotations.UpdateTimestamp;

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
    private boolean auction;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "product", cascade = CascadeType.ALL)
    private List<Photo> photos;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = {CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    private List<ShoppingCartProducts> shoppingCartProducts;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = {CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    private List<Auction> auctions;

    @UpdateTimestamp
    @Column(name = "edition_date")
    private Timestamp editionDate;

    @Column(name = "final_date_auction")
    private LocalDate finalDateAuction;

    @Column(name = "actual_price_auction")
    private double actual_price_auction;

}
