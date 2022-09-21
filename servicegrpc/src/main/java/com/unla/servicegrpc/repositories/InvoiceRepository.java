package com.unla.servicegrpc.repositories;

import com.unla.servicegrpc.models.database.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice,Long> {

}
