package com.unla.servicegrpc.grpcservices;

import com.unla.servicegrpc.grpc.*;
import com.unla.servicegrpc.models.database.ShoppingCart;
import com.unla.servicegrpc.models.database.ShoppingCartProducts;
import com.unla.servicegrpc.models.request.RequestShoppingCartDTO;
import com.unla.servicegrpc.services.IProductService;
import com.unla.servicegrpc.services.IShoppingCartService;
import com.unla.servicegrpc.services.IUserService;
import com.unla.servicegrpc.services.IWalletService;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@GrpcService
public class ShoppingCartGrpcImpl extends shoppingcartGrpc.shoppingcartImplBase {

    @Autowired
    private IShoppingCartService shoppingCartService;

    @Autowired
    private IProductService productService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IWalletService walletService;

    @Override
    public void comprar(RequestCart request, StreamObserver<ResponseCart> responseObserver) {

        RequestShoppingCartDTO requestShoppingCartDTO = new RequestShoppingCartDTO();

        requestShoppingCartDTO.setUser(userService.findById(request.getUserCompraId()));

        double total = 0;
        List<ShoppingCartProducts> shoppingCartProducts = new ArrayList<>();

        for (int i=0;i<request.getItemCartCount();i++){
            ShoppingCartProducts products = new ShoppingCartProducts();
            products.setProduct(productService.findById(request.getItemCart(i).getItemId()));
            int stock = products.getProduct().getQuantity()-request.getItemCart(i).getItemQuantity();
            products.getProduct().setQuantity(stock);
            products.setQuantity(request.getItemCart(i).getItemQuantity());
            products.setSubtotal(products.getProduct().getPrice()*request.getItemCart(i).getItemQuantity());
            total += products.getSubtotal();
            shoppingCartProducts.add(products);
        }

        requestShoppingCartDTO.setShoppingCartProducts(shoppingCartProducts);
        requestShoppingCartDTO.setFinalPrice(total);

        ShoppingCart shoppingCart = shoppingCartService.comprar(requestShoppingCartDTO);
        try {
            walletService.subtractBalance(requestShoppingCartDTO.getUser().getId(), total);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        for (int k=0;k<shoppingCartProducts.size();k++){
            System.out.println(shoppingCart.getShoppingCartProducts().get(k).getProduct().getQuantity());
            System.out.println(shoppingCart.getShoppingCartProducts().get(k).getProduct().getId());
            productService.updateStock(shoppingCart.getShoppingCartProducts().get(k).getProduct().getQuantity() ,shoppingCart.getShoppingCartProducts().get(k).getProduct().getId());
        }
        //despues de realizar la compra

        UserCompra userCompra = UserCompra.newBuilder()
                .setUserCompraId(shoppingCart.getUser().getId())
                .setUsername(shoppingCart.getUser().getUsername())
                .build();

        List<ProductData> productData = new ArrayList<>();
        for (int j=0;j < shoppingCart.getShoppingCartProducts().size();j++){
            ProductData productToAdd = ProductData.newBuilder()
                    .setId(shoppingCart.getShoppingCartProducts().get(j).getProduct().getId())
                    .setCategory(shoppingCart.getShoppingCartProducts().get(j).getProduct().getCategory())
                    .setName(shoppingCart.getShoppingCartProducts().get(j).getProduct().getName())
                    .setPrice(shoppingCart.getShoppingCartProducts().get(j).getProduct().getPrice())
                    .setItemQuantity(shoppingCart.getShoppingCartProducts().get(j).getQuantity())
                    .build();
            productData.add(productToAdd);
        }

        ResponseCart responseCart = ResponseCart.newBuilder()
                .setShoppingCartId(shoppingCart.getId())
                .setUserCompra(userCompra)
                .addAllItemProduct(productData)
                .setPrecioFinal(shoppingCart.getFinalPrice())
                .build();

        responseObserver.onNext(responseCart);
        responseObserver.onCompleted();
    }
}
