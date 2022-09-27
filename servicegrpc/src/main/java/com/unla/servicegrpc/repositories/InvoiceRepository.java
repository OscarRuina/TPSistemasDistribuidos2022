package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.Invoice;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice,Long> {

    List<Invoice> findByUserBuyer(String userBuyer);

}
