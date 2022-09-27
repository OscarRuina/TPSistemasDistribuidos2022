package com.unla.servicegrpc.grpcservices;

import com.unla.servicegrpc.grpc.buyer;
import com.unla.servicegrpc.grpc.buyerId;
import com.unla.servicegrpc.grpc.getInvoices;
import com.unla.servicegrpc.grpc.invoiceGrpc;
import com.unla.servicegrpc.grpc.invoiceObject;
import com.unla.servicegrpc.grpc.invoiceProductObjects;
import com.unla.servicegrpc.grpc.seller;
import com.unla.servicegrpc.models.database.Invoice;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.repositories.InvoiceRepository;
import com.unla.servicegrpc.repositories.UserRepository;
import io.grpc.stub.StreamObserver;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

@GrpcService
public class InvoiceServiceGrpcImpl extends invoiceGrpc.invoiceImplBase {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public void listInvoices(buyerId request, StreamObserver<getInvoices> responseObserver) {
        User buyerDB = userRepository.findById(request.getBuyerId()).orElseThrow();
        List<Invoice> invoicesDB = invoiceRepository.findByUserBuyer(buyerDB.getUsername());

        List<invoiceObject> invoices = new ArrayList<>();

        for (int i = 0; i < invoicesDB.size(); i++) {
            List<invoiceProductObjects> invoiceProductObjects = new ArrayList<>();
            for (int j = 0; j < invoicesDB.get(i).getInvoiceProducts().size(); j++) {
                invoiceProductObjects invoiceProductObjects1 =
                        com.unla.servicegrpc.grpc.invoiceProductObjects.newBuilder()
                                .setName(invoicesDB.get(i).getInvoiceProducts().get(j).getNameProduct())
                                .setPrice(invoicesDB.get(i).getInvoiceProducts().get(j).getPrice())
                                .setQuantity(invoicesDB.get(i).getInvoiceProducts().get(j).getQuantity())
                                .build();
                invoiceProductObjects.add(invoiceProductObjects1);
            }
            User sellerDB = userRepository.findByUsernameIgnoreCase(
                            invoicesDB.get(i).getUserSeller())
                    .orElseThrow();
            invoiceObject invoice = invoiceObject.newBuilder()
                    .setId(invoicesDB.get(i).getId())
                    .setDate(invoicesDB.get(i).getDate().toString())
                    .setSeller(
                            seller.newBuilder()
                                    .setName(sellerDB.getName())
                                    .setLastname(sellerDB.getLastname())
                                    .setUsername(sellerDB.getUsername())
                                    .setEmail(sellerDB.getEmail())
                                    .build()
                    )
                    .setBuyer(buyer.newBuilder()
                            .setName(buyerDB.getName())
                            .setLastname(buyerDB.getLastname())
                            .setUsername(buyerDB.getUsername())
                            .setEmail(buyerDB.getEmail())
                            .build())
                    .addAllProducts(invoiceProductObjects)
                    .setTotal(invoicesDB.get(i).getTotal())
                    .build();
            invoices.add(invoice);
        }

        getInvoices getInvoices = com.unla.servicegrpc.grpc.getInvoices.newBuilder()
                .addAllInvoices(invoices)
                .build();

        responseObserver.onNext(getInvoices);
        responseObserver.onCompleted();

    }
}
