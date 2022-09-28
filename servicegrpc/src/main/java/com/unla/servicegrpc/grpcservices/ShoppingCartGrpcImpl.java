package com.unla.servicegrpc.grpcservices;

import com.unla.servicegrpc.grpc.*;
import com.unla.servicegrpc.models.database.ShoppingCart;
import com.unla.servicegrpc.models.database.ShoppingCartProducts;
import com.unla.servicegrpc.models.database.User;
import com.unla.servicegrpc.models.request.RequestShoppingCartDTO;
import com.unla.servicegrpc.repositories.UserRepository;
import com.unla.servicegrpc.services.IProductService;
import com.unla.servicegrpc.services.IShoppingCartService;
import com.unla.servicegrpc.services.IUserService;
import com.unla.servicegrpc.services.IWalletService;
import io.grpc.stub.StreamObserver;
import java.time.LocalDate;
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
    public void comprar(RequestCart request, StreamObserver<ResponseInvoice> responseObserver) {
        RequestShoppingCartDTO requestShoppingCartDTO = new RequestShoppingCartDTO();

        requestShoppingCartDTO.setPurchaseDate(LocalDate.parse(request.getPurchaseDate()));
        requestShoppingCartDTO.setUser(userService.findById(request.getUserCompraId()));

        double total = 0;
        List<ShoppingCartProducts> shoppingCartProducts = new ArrayList<>();

        for (int i = 0; i < request.getItemCartCount(); i++) {
            ShoppingCartProducts products = new ShoppingCartProducts();
            products.setProduct(productService.findById(request.getItemCart(i).getItemId()));
            int stock =
                    products.getProduct().getQuantity() - request.getItemCart(i).getItemQuantity();
            products.getProduct().setQuantity(stock);
            products.setQuantity(request.getItemCart(i).getItemQuantity());
            products.setSubtotal(
                    products.getProduct().getPrice() * request.getItemCart(i).getItemQuantity());
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
        for (int k = 0; k < shoppingCartProducts.size(); k++) {
            System.out.println(
                    shoppingCart.getShoppingCartProducts().get(k).getProduct().getQuantity());
            System.out.println(shoppingCart.getShoppingCartProducts().get(k).getProduct().getId());
            productService.updateStock(
                    shoppingCart.getShoppingCartProducts().get(k).getProduct().getQuantity(),
                    shoppingCart.getShoppingCartProducts().get(k).getProduct().getId());
        }
        /** despues de realizar la compra, devuelvo objetos con la estructura invoice **/

        User buyer = userService.findById(request.getUserCompraId());
        buyerCart buyerCart = com.unla.servicegrpc.grpc.buyerCart.newBuilder()
                .setName(buyer.getName())
                .setLastname(buyer.getLastname())
                .setUsername(buyer.getUsername())
                .setEmail(buyer.getEmail())
                .build();

        User seller = userService.findById(shoppingCart.getShoppingCartProducts()
                .get(shoppingCart.getShoppingCartProducts().size() - 1).getProduct().getUser().getId());

        sellerCart sellerCart = com.unla.servicegrpc.grpc.sellerCart.newBuilder()
                .setName(seller.getName())
                .setLastname(seller.getLastname())
                .setUsername(seller.getUsername())
                .setEmail(seller.getEmail())
                .build();

        List<ResponseInvoiceProducts> products = new ArrayList<>();
        for (int i = 0; i < shoppingCart.getShoppingCartProducts().size(); i++){
            ResponseInvoiceProducts responseInvoiceProducts = ResponseInvoiceProducts.newBuilder()
                    .setName(shoppingCart.getShoppingCartProducts().get(i).getProduct().getName())
                    .setPrice(shoppingCart.getShoppingCartProducts().get(i).getProduct().getPrice())
                    .setQuantity(shoppingCart.getShoppingCartProducts().get(i).getQuantity())
                    .build();
            products.add(responseInvoiceProducts);
        }

        ResponseInvoice responseInvoice = ResponseInvoice.newBuilder()
                .setPurchaseDate(shoppingCart.getPurchaseDate().toString())
                .setSeller(sellerCart)
                .setBuyer(buyerCart)
                .addAllProducts(products)
                .setTotalAmount(shoppingCart.getFinalPrice())
                .build();

        responseObserver.onNext(responseInvoice);
        responseObserver.onCompleted();

    }

    /**
     * @Override public void comprar(RequestCart request, StreamObserver<ResponseCart>
     *         responseObserver) {
     *
     *         RequestShoppingCartDTO requestShoppingCartDTO = new RequestShoppingCartDTO();
     *
     *         requestShoppingCartDTO.setUser(userService.findById(request.getUserCompraId()));
     *
     *         double total = 0; List<ShoppingCartProducts> shoppingCartProducts = new
     *         ArrayList<>();
     *
     *         for (int i=0;i<request.getItemCartCount();i++){ ShoppingCartProducts products = new
     *         ShoppingCartProducts();
     *         products.setProduct(productService.findById(request.getItemCart(i).getItemId())); int
     *         stock = products.getProduct().getQuantity()-request.getItemCart(i).getItemQuantity();
     *         products.getProduct().setQuantity(stock);
     *         products.setQuantity(request.getItemCart(i).getItemQuantity());
     *         products.setSubtotal(products.getProduct().getPrice()*request.getItemCart(i)
     *         .getItemQuantity()); total += products.getSubtotal();
     *         shoppingCartProducts.add(products); }
     *
     *         requestShoppingCartDTO.setShoppingCartProducts(shoppingCartProducts);
     *         requestShoppingCartDTO.setFinalPrice(total);
     *
     *         ShoppingCart shoppingCart = shoppingCartService.comprar(requestShoppingCartDTO); try
     *         { walletService.subtractBalance(requestShoppingCartDTO.getUser().getId(), total); }
     *         catch (Exception e) { throw new RuntimeException(e); } for (int
     *         k=0;k<shoppingCartProducts.size();k++){
     *         System.out.println(shoppingCart.getShoppingCartProducts().get(k).getProduct()
     *         .getQuantity());
     *         System.out.println(shoppingCart.getShoppingCartProducts().get(k).getProduct()
     *         .getId()); productService.updateStock(shoppingCart.getShoppingCartProducts().get(k)
     *         .getProduct().getQuantity()
     *         ,shoppingCart.getShoppingCartProducts().get(k).getProduct().getId()); } //despues de
     *         realizar la compra
     *
     *         UserCompra userCompra = UserCompra.newBuilder()
     *         .setUserCompraId(shoppingCart.getUser().getId())
     *         .setUsername(shoppingCart.getUser().getUsername()) .build();
     *
     *         List<ProductData> productData = new ArrayList<>(); for (int j=0;j <
     *         shoppingCart.getShoppingCartProducts().size();j++){ ProductData productToAdd =
     *         ProductData.newBuilder()
     *         .setId(shoppingCart.getShoppingCartProducts().get(j).getProduct().getId())
     *         .setCategory(shoppingCart.getShoppingCartProducts().get(j).getProduct()
     *         .getCategory())
     *         .setName(shoppingCart.getShoppingCartProducts().get(j).getProduct().getName())
     *         .setPrice(shoppingCart.getShoppingCartProducts().get(j).getProduct().getPrice())
     *         .setItemQuantity(shoppingCart.getShoppingCartProducts().get(j).getQuantity())
     *         .setUserId(shoppingCart.getShoppingCartProducts().get(j).getProduct().getUser()
     *         .getId()) .build(); productData.add(productToAdd); }
     *
     *         ResponseCart responseCart = ResponseCart.newBuilder()
     *         .setShoppingCartId(shoppingCart.getId()) .setUserCompra(userCompra)
     *         .addAllItemProduct(productData) .setPrecioFinal(shoppingCart.getFinalPrice())
     *         .build();
     *
     *         responseObserver.onNext(responseCart); responseObserver.onCompleted();
     *
     *         }
     **/

    @Override
    public void listUserPurchaseShoppingCart(getIdUser request,
            StreamObserver<getList> responseObserver) {
        List<ShoppingCart> shoppingCarts = shoppingCartService.getListUserId(request.getUserId());
        List<ResponseCart> responseCarts = new ArrayList<>();

        for (int i = 0; i < shoppingCarts.size(); i++) {

            List<ProductData> productsData = new ArrayList<>();
            for (int j = 0; j < shoppingCarts.get(i).getShoppingCartProducts().size(); j++) {
                ProductData productData = ProductData.newBuilder()
                        .setId(shoppingCarts.get(i).getShoppingCartProducts().get(j).getId())
                        .setCategory(
                                shoppingCarts.get(i).getShoppingCartProducts().get(j).getProduct()
                                        .getCategory())
                        .setName(shoppingCarts.get(i).getShoppingCartProducts().get(j).getProduct()
                                .getName())
                        .setPrice(shoppingCarts.get(i).getShoppingCartProducts().get(j).getProduct()
                                .getPrice())
                        .setItemQuantity(
                                shoppingCarts.get(i).getShoppingCartProducts().get(j).getQuantity())
                        .setUserId(
                                shoppingCarts.get(i).getShoppingCartProducts().get(j).getProduct()
                                        .getUser().getId())
                        .build();
                productsData.add(productData);
            }

            ResponseCart responseCart = ResponseCart.newBuilder()
                    .setShoppingCartId(shoppingCarts.get(i).getId())
                    .setPurchaseDate(shoppingCarts.get(i).getPurchaseDate().toString())
                    .setUserCompra(UserCompra.newBuilder()
                            .setUserCompraId(shoppingCarts.get(i).getUser().getId())
                            .setUsername(shoppingCarts.get(i).getUser().getUsername())
                            .build())
                    .addAllItemProduct(productsData)
                    .setPrecioFinal(shoppingCarts.get(i).getFinalPrice())
                    .build();
            responseCarts.add(responseCart);
        }

        getList getList = com.unla.servicegrpc.grpc.getList.newBuilder()
                .addAllResponseCart(responseCarts)
                .build();
        responseObserver.onNext(getList);
        responseObserver.onCompleted();

    }
}
