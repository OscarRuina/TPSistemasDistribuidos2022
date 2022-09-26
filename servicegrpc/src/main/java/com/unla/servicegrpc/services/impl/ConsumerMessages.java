package com.unla.servicegrpc.services.impl;

import com.unla.servicegrpc.models.database.Invoice;
import com.unla.servicegrpc.models.database.InvoiceProducts;
import com.unla.servicegrpc.repositories.InvoiceRepository;
import com.unla.servicegrpc.services.IConsumerMessages;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ConsumerMessages implements IConsumerMessages {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public String getTopic(String groupId, String topic) {
        String url = "http://127.0.0.1:5000/messages?groupId=" + groupId + "&topic=" + topic;
        RestTemplate restTemplate = new RestTemplate();
        String messages = restTemplate.getForObject(url, String.class);
        JSONObject json = new JSONObject(messages);
        String topic1 = json.getString("topic");

        if (topic1.equalsIgnoreCase("invoice")) {
            saveInvoices(json);
        }
        if (topic1.equalsIgnoreCase("auction")) {
            saveLastAuction(json);
        }

        return messages;
    }

    private void saveInvoices(JSONObject json) {
        /** Structure Array messages **/
        JSONArray jsonArray = json.getJSONArray("messages");
        for (int i = 0; i < jsonArray.length(); i++) {
            /** Structure object messages**/
            JSONObject object = jsonArray.getJSONObject(i);
            saveInvoice(object);
        }
    }

    private void saveInvoice(JSONObject json) {
        /** Structure message **/
        JSONObject jsonObject = json.getJSONObject("message");

        /** Format Date YYYY-MM-DD **/
        LocalDate date = LocalDate.parse(jsonObject.getString("purchaseDate"));

        /** User Seller **/
        JSONObject seller = jsonObject.getJSONObject("seller");
        String sellerUserName = seller.getString("username");

        /** User Buyer **/
        JSONObject buyer = jsonObject.getJSONObject("buyer");
        String buyerUserName = buyer.getString("username");

        /** Total **/
        Double total = jsonObject.getDouble("totalAmount");

        /** Create invoice object **/
        Invoice invoice = new Invoice();
        invoice.setDate(date);
        invoice.setUserSeller(sellerUserName);
        invoice.setUserBuyer(buyerUserName);

        /** Structure Array products - List invoice products **/
        List<InvoiceProducts> invoiceProducts = new ArrayList<>();

        JSONArray products = jsonObject.getJSONArray("products");
        for (int i = 0; i < products.length(); i++){
            JSONObject product = products.getJSONObject(i);

            String name = product.getString("name");
            double price = product.getDouble("price");
            int quantity = product.getInt("quantity");

            InvoiceProducts invoiceProducts1 = new InvoiceProducts();
            invoiceProducts1.setNameProduct(name);
            invoiceProducts1.setPrice(price);
            invoiceProducts1.setQuantity(quantity);
            invoiceProducts1.setInvoice(invoice);

            invoiceProducts.add(invoiceProducts1);
        }

        invoice.setInvoiceProducts(invoiceProducts);
        invoice.setTotal(total);

        invoiceRepository.save(invoice);

    }

    private void saveLastAuction(JSONObject json) {
    }
}
