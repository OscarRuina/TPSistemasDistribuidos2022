package com.unla.servicegrpc.models.database;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "INVOICE")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;

    @Column(name = "date", nullable = true)
    private LocalDate date;

    private String userSeller;          //Usuario Vendedor.

    private String userBuyer;           //Usuario Comprador.

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "invoice", cascade = {CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    private List<InvoiceProducts> invoiceProducts;

    private double total;                //Total
}
