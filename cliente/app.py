from flask import Flask, request, Response
from flask_cors import CORS
from topics import topics
from consumer import consumer_groups, get_messages
from producer import produce_messages
from pdf_generator import pdf_generator
import json

import logging

import grpc
import user_pb2
import user_pb2_grpc
import wallet_pb2
import wallet_pb2_grpc
import product_pb2
import product_pb2_grpc
import shoppingcart_pb2
import shoppingcart_pb2_grpc
import auction_pb2
import auction_pb2_grpc
import invoice_pb2
import invoice_pb2_grpc

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# ====================================
#   User
# ====================================


@app.route("/user", methods=["POST"])
def registerUser():
    try:
        name = request.json['name']
        lastname = request.json['lastname']
        email = request.json['email']
        username = request.json['username']
        password = request.json['password']
        role = request.json['role']

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = user_pb2_grpc.userStub(channel)
            user = stub.register(user_pb2.RegisterRequest(
                name=name, lastname=lastname, email=email, username=username, password=password, role=role))
            userResponse = {
                "id": user.__getattribute__("id"),
                "name": user.__getattribute__("name"),
                "lastname": user.__getattribute__("lastname"),
                "email": user.__getattribute__("email"),
                "username": user.__getattribute__("username"),
                "role": user.__getattribute__("role")
            }
        return userResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/user", methods=["GET"])
def getUser():
    try:
        userId = int(request.args.get('id'))

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = user_pb2_grpc.userStub(channel)
            user = stub.get(user_pb2.GetById(id=userId))

            userResponse = {
                "id": user.__getattribute__("id"),
                "name": user.__getattribute__("name"),
                "lastname": user.__getattribute__("lastname"),
                "email": user.__getattribute__("email"),
                "username": user.__getattribute__("username")
            }

        return userResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/login", methods=["POST"])
def login():
    try:
        username = request.json['username']
        password = request.json['password']

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = user_pb2_grpc.userStub(channel)
            login = stub.login(user_pb2.LoginRequest(
                username=username, password=password))
            loginResponse = {
                "id": login.__getattribute__("id"),
                "username": login.__getattribute__("username"),
                "role": login.__getattribute__("role")
            }

        return loginResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/logout", methods=["POST"])
def logout():
    try:
        with grpc.insecure_channel('localhost:9090') as channel:
            stub = user_pb2_grpc.userStub(channel)
            logout = stub.logout(user_pb2.LogoutResponse())
            logoutResponse = {
                "message": logout.__getattribute__("message")
            }

        return logoutResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')

# ====================================
#   Wallet
# ====================================


@app.route("/addWallet", methods=["POST"])
def addwallet():
    try:
        balance = int(request.json['balance'])
        userid = int(request.json['userId'])

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = wallet_pb2_grpc.walletStub(channel)
            response = stub.add(wallet_pb2.RegisterRequestWallet(
                balance=balance, userId=userid))

            json = {
                "id": response.__getattribute__("id"),
                "balance": response.__getattribute__("balance"),
                "userId": response.__getattribute__("userId"),
            }

        return json
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route('/subtractWallet', methods=['POST'])
def subtractwallet():
    try:
        balance = int(request.json["balance"])
        userid = int(request.json["userId"])

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = wallet_pb2_grpc.walletStub(channel)
            response = stub.subtract(wallet_pb2.RegisterRequestWallet(
                balance=balance, userId=userid))

            json = {
                "message": response.__getattribute__("message"),
            }

        return json
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')

# ====================================
#   Product
# ====================================


@app.route('/product', methods=['POST'])
def createProduct():
    try:
        name = request.json["name"]
        category = request.json["category"]
        quantity = int(request.json["quantity"])
        price = float(request.json["price"])
        date = request.json["date"]

        isSubasta = request.json["at_auction"]
        at_auction = False
        if isSubasta == "true":
            at_auction = True

        userId = int(request.json["userId"])
        photos = request.json["photos"]

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = product_pb2_grpc.productStub(channel)
            product = stub.create(product_pb2.RequestProduct(name=name, category=category,
                                quantity=quantity, price=price, date=date, at_auction=at_auction, userId=userId, photos=photos))

            PHOTOS = []

            for photo in product.__getattribute__("photos"):
                photosJson = {
                    "url": photo.__getattribute__("url"),
                    "order": photo.__getattribute__("order")
                }
                PHOTOS.append(photosJson)

            productResponse = {
                "name": product.__getattribute__("name"),
                "category": product.__getattribute__("category"),
                "quantity": product.__getattribute__("quantity"),
                "price": product.__getattribute__("price"),
                "date": product.__getattribute__("date"),
                "at_auction": product.__getattribute__("at_auction"),
                "userId": product.__getattribute__("userId"),
                "photos": PHOTOS,
                "actualPrice": product.__getattribute__("actualPrice"),
                "finalDate": product.__getattribute__("finalDate")
            }

            # Se debe guardar en un topic de Kafka nombrado con el id del producto la siguiente información:
            topic = "product_" + str(product.__getattribute__("id"))
            orders = {
                "orders": [{
                    "date": date,
                    "old": [{
                        "name": "null",
                        "price": "null"
                    }],
                    "new": [{
                        "name": name,
                        "price": price
                    }]
                }]
            }
            message = json.dumps(produce_messages(topic, orders["orders"]))
            kafka = Response(message, status=200, mimetype='application/json')

        return productResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route('/updproduct', methods=['POST'])
def updateProduct():
    try:
        id = int(request.json["id"])
        name = request.json["name"]
        category = request.json["category"]
        quantity = int(request.json["quantity"])
        price = float(request.json["price"])
        date = request.json["date"]
        at_auction = request.json["at_auction"]
        userId = int(request.json["userId"])
        photos = request.json["photos"]

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = product_pb2_grpc.productStub(channel)
            product = stub.update(product_pb2.ResponseProduct(id=id, name=name, category=category,
                                quantity=quantity, price=price, date=date, at_auction=at_auction, userId=userId, photos=photos))

            PHOTOS = []

            for photo in product.__getattribute__("photos"):
                photosJson = {
                    "url": photo.__getattribute__("url"),
                    "order": photo.__getattribute__("order")
                }
                PHOTOS.append(photosJson)

            productResponse = {
                "name": product.__getattribute__("name"),
                "category": product.__getattribute__("category"),
                "quantity": product.__getattribute__("quantity"),
                "price": product.__getattribute__("price"),
                "date": product.__getattribute__("date"),
                "at_auction": product.__getattribute__("at_auction"),
                "userId": product.__getattribute__("userId"),
                "photos": PHOTOS,
                "actualPrice": product.__getattribute__("actualPrice"),
                "finalDate": product.__getattribute__("finalDate")
            }

            topic = "product_" + str(id)
            orders = {
                "orders": [{
                    "date": date,
                    "old": [{
                        "name": product.__getattribute__("nameOld"),
                        "price": product.__getattribute__("priceOld")
                    }],
                    "new": [{
                        "name": name,
                        "price": price
                    }]
                }]
            }
            message = json.dumps(produce_messages(topic, orders["orders"]))
            kafka = Response(message, status=200, mimetype='application/json')

        return productResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route('/product', methods=['GET'])
def getProduct():
    try:
        userIdDistinct = int(request.args.get('userIdDistinct')) if request.args.get(
            'userIdDistinct') is not None else None

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = product_pb2_grpc.productStub(channel)

            productList = stub.getProductsDistinctByUserId(
                product_pb2.RequestProductByUserId(userId=userIdDistinct))

            PRODUCTS = []

            for product in productList.__getattribute__("products"):

                PHOTOS = []

                for photo in product.__getattribute__("photos"):
                    photosJson = {
                        "url": photo.__getattribute__("url"),
                        "order": photo.__getattribute__("order")
                    }
                    PHOTOS.append(photosJson)

                productJson = {
                    "id": product.__getattribute__("id"),
                    "name": product.__getattribute__("name"),
                    "category": product.__getattribute__("category"),
                    "quantity": product.__getattribute__("quantity"),
                    "price": product.__getattribute__("price"),
                    "date": product.__getattribute__("date"),
                    "at_auction": product.__getattribute__("at_auction"),
                    "userId": product.__getattribute__("userId"),
                    "photos": PHOTOS
                }

                PRODUCTS.append(productJson)

        productResponse = {
            "products": PRODUCTS
        }

        return productResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route('/auctions', methods=['GET'])
def getProductAuctions():
    try:
        userIdRequest = int(request.args.get('userId')) if request.args.get(
            'userId') is not None else None

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = product_pb2_grpc.productStub(channel)
            
            auctionList = stub.getProductsInAuctionByUserId(
                product_pb2.RequestProductByUserId(userId=userIdRequest)
            )
            PRODUCTS = []

            for product in auctionList.__getattribute__("products"):

                PHOTOS = []

                for photo in product.__getattribute__("photos"):
                    photosJson = {
                        "url": photo.__getattribute__("url"),
                        "order": photo.__getattribute__("order")
                    }
                    PHOTOS.append(photosJson)

                productJson = {
                    "id": product.__getattribute__("id"),
                    "name": product.__getattribute__("name"),
                    "category": product.__getattribute__("category"),
                    "quantity": product.__getattribute__("quantity"),
                    "price": product.__getattribute__("price"),
                    "date": product.__getattribute__("date"),
                    "at_auction": product.__getattribute__("at_auction"),
                    "userId": product.__getattribute__("userId"),
                    "photos": PHOTOS
                }

                PRODUCTS.append(productJson)

        productResponse = {
            "products": PRODUCTS
        }

        return productResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')

# ====================================
#   ShoppingCart
# ====================================

# comprar(RequestCart) returns(ResponseInvoice);
@app.route('/shoppingcart', methods=['POST'])
def toBuyShoppingCart():
    try:
        userCompraId = request.json["userCompraId"]
        purchaseDate = request.json["purchaseDate"]
        itemCart = request.json["itemCart"]
        purchaseDate = request.json["purchaseDate"]

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = shoppingcart_pb2_grpc.shoppingcartStub(channel)
            response = stub.comprar(shoppingcart_pb2.RequestCart(
                userCompraId=userCompraId, itemCart=itemCart, purchaseDate=purchaseDate))


            ITEMPRODUCT = []

            for item in response.__getattribute__("products"):
                photosJson = {
                    "name": item.__getattribute__("name"),
                    "itemQuantity": item.__getattribute__("quantity"),
                    "price": item.__getattribute__("price")
                }
                ITEMPRODUCT.append(photosJson)

            userCompra = {
                "name": response.__getattribute__("buyer").__getattribute__("name"),
                "lastname": response.__getattribute__("buyer").__getattribute__("lastname"),
                "username": response.__getattribute__("buyer").__getattribute__("username"),
                "email": response.__getattribute__("buyer").__getattribute__("email")
            } 
            userVenta = {
                "name": response.__getattribute__("seller").__getattribute__("name"),
                "lastname": response.__getattribute__("seller").__getattribute__("lastname"),
                "username": response.__getattribute__("seller").__getattribute__("username"),
                "email": response.__getattribute__("seller").__getattribute__("email")
            }

            
            productResponse = {
                "date": response.__getattribute__("date"),
                "products": ITEMPRODUCT,
                "buyer": userCompra,
                "seller": userVenta,
                "total": response.__getattribute__("total"),
            }

        return productResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')

#listUserPurchaseShoppingCart(getIdUser) returns(getList);
@app.route('/shoppingcartListUserPurchase', methods=['GETA'])
def listUserPurchaseShoppingCart():
    try:
        userId = int(request.args.get('userId')) if request.args.get('userId') is not None else None

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = shoppingcart_pb2_grpc.shoppingcartStub(channel)
            response = stub.listUserPurchaseShoppingCart(shoppingcart_pb2.getIdUser(
                userId=userId))

        CART = []

        for item in response.__getattribute__("responseCart"):

            CART2 = []

            for item2 in item.__getattribute__("itemProduct"):
                itemJson2 = {
                    "id": item2.__getattribute__("id"),
                    "name": item2.__getattribute__("name"),
                    "category": item2.__getattribute__("category"),
                    "itemQuantity": item2.__getattribute__("itemQuantity"),
                    "price": item2.__getattribute__("price"),
                    "userId": item2.__getattribute__("userId")
                }
                CART2.append(itemJson2)

            itemJson = {
                "shoppingCartId": item.__getattribute__("shoppingCartId"),
                "purchaseDate": item.__getattribute__("purchaseDate"),
                "userCompra": item.__getattribute__("userCompra"),
                "itemProduct": CART2,
                "precioFinal": item.__getattribute__("precioFinal")
            }
            CART.append(itemJson)

        responseListUserPurchaseShoppingCarta = {
            "responseCart": CART
        }
        return responseListUserPurchaseShoppingCarta
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')

# ====================================
#   Auction
# ====================================

@app.route('/Auction', methods=['POST'])
def toBuyAuction():
    try:
        userId = int(request.json["userId"])
        productId = int(request.json["productId"])
        total = float(request.json["total"])

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = auction_pb2_grpc.auctionStub(channel)
            response = stub.getAuctionsByUserPurchase(auction_pb2.RegisterAuction(
                userId=userId, productId=productId, total=total))

            AuctionResponse = {
                "id": response.__getattribute__("id"),
                "name": response.__getattribute__("userId"),
                "lastname": response.__getattribute__("productId"),
                "email": response.__getattribute__("total"),
                "date": response.__getattribute__("date")
            }

            # Dentro de una subasta, cada vez que un comprador puja, se registra en un topic de Kafka exclusivo para cada producto, donde se guardará:
            # fecha puja,
            # id comprador,
            # precio ofrecido.
            topic = "productAuction_" + str(productId)
            orders = {
                "orders": [{
                    "date": date,
                    "idBuyer": userId,
                    "price": price
                }]
            }
            message = json.dumps(produce_messages(topic, orders["orders"]))
            kafka = Response(message, status=200, mimetype='application/json')

        return AuctionResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route('/Auction', methods=['GET'])
def toGetAuction():
    try:
        userId = int(request.args.get('userId')) if request.args.get('userId') is not None else None

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = auction_pb2_grpc.auctionStub(channel)
            response = stub.getProductsInAuctionByUserId(auction_pb2.RequestUserId(
                userId=userId))

            ITEMAUCTION = []

            for item in response.__getattribute__("auctions"):
                AuctionResponse = {
                    "id": item.__getattribute__("id"),
                    "name": item.__getattribute__("userId"),
                    "lastname": item.__getattribute__("productId"),
                    "email": item.__getattribute__("total"),
                    "date": item.__getattribute__("date")
                }
                ITEMAUCTION.append(AuctionResponse)

            AuctionResponse2 = {
                "auctions": ITEMAUCTION
            }

        return AuctionResponse2
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route('/AuctionUp', methods=['POST'])
def pujarAuction():
    try:
        idProduct = int(request.json["productId"])
        userId = int(request.json["userId"])
        date = request.json["date"]
        price = float(request.json["price"])

        # Dentro de una subasta, cada vez que un comprador puja, se registra en un topic de Kafka exclusivo para cada producto, donde se guardará:
        # fecha puja,
        # id comprador,
        # precio ofrecido.
        topic = "productAuction_" + str(idProduct)
        orders = {
            "orders": [{
                "date": date,
                "idBuyer": userId,
                "price": price
            }]
        }
        message = json.dumps(produce_messages(topic, orders["orders"]))
        AuctionResponse = Response(message, status=200, mimetype='application/json')

        return AuctionResponse
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')

# ====================================
#   Invoice
# ====================================

#rpc listInvoices(buyerId) returns (getInvoices);
@app.route('/Invoices', methods=['GET'])
def toGetInvoices():
    try:
        buyerId = int(request.args.get('buyerId')) if request.args.get(
            'userId') is not None else None

        with grpc.insecure_channel('localhost:9090') as channel:
            stub = invoice_pb2_grpc.invoiceStub(channel)
            response = stub.listInvoices(invoice_pb2.buyerId(
                buyerId=buyerId))

            ItemInvoices = []

            for item in response.__getattribute__("invoices"):
                seller = item.__getattribute__("seller")
                buyer = item.__getattribute__("buyer")

                jsonSeller = {
                    "name": seller.__getattribute__("name"),
                    "lastname": seller.__getattribute__("lastname"),
                    "username": seller.__getattribute__("username"),
                    "email": seller.__getattribute__("email")
                }
                jsonBuyer = {
                    "name": buyer.__getattribute__("name"),
                    "lastname": buyer.__getattribute__("lastname"),
                    "username": buyer.__getattribute__("username"),
                    "email": buyer.__getattribute__("email")
                }

                ItemInvoices2 = []

                for item2 in item.__getattribute__("invoices"):
                    Jsonproducts = {
                        "name": item2.__getattribute__("name"),
                        "price": item2.__getattribute__("price"),
                        "quantity": item2.__getattribute__("quantity")
                    }

                    ItemInvoices2.append(Jsonproducts)

                InvoicesResponse = {
                    "id": item.__getattribute__("id"),
                    "date": item.__getattribute__("date"),
                    "seller": jsonSeller,
                    "buyer": jsonBuyer,
                    "total": item.__getattribute__("total")
                }
                ItemInvoices.append(InvoicesResponse)

            jsonItemInvoices = {
                "invoices": ItemInvoices
            }

            return jsonItemInvoices
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')

# ====================================
#   Kafka
# ====================================

@app.route("/topics", methods=["GET"])
def get_topics():
    try:
        group_id = request.args.get('groupId') if request.args.get(
            'groupId') is not None else 'default'
        return topics(group_id)
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/consumer-groups", methods=["GET"])
def get_consumer_groups():
    try:
        return consumer_groups()
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/messages", methods=["GET"])
def get_consumer_messages():
    try:
        response = ''
        group_id = request.args.get('groupId') if request.args.get(
            'groupId') is not None else 'default'
        if request.args.get('topic'):
            topic = request.args.get('topic')
            message = json.dumps(get_messages(topic, group_id))
            response = Response(message, status=200, mimetype='application/json')
        else:
            message = json.dumps({"error": "missing topic"})
            response = Response(message, status=400, mimetype='application/json')
        return response
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/messages", methods=["POST"])
def submit_messages():
    response = ''
    try:
        if request.json['topic']:
            topic = request.json['topic']
            if request.json['message'] is None:
                raise ValueError(
                    "The body does not contain same messages as topic")
            messages = request.json["message"]
            message = json.dumps(produce_messages(topic, messages))
            response = Response(message, status=200,
                                mimetype='application/json')
        else:
            message = json.dumps({"error": "missing topic"})
            response = Response(message, status=400,
                                mimetype='application/json')
        return response
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


@app.route("/pdf/download", methods=["POST"])
def pdf_download():
    try:
        invoice_id = request.json['invoiceId']
        purchase_date = request.json['purchaseDate']
        seller = request.json['seller']
        buyer = request.json['buyer']
        products = request.json['products']
        total_amount = request.json['totalAmount']

        encoded_pdf = pdf_generator(invoice_id, purchase_date,
                                    seller, buyer, products, total_amount)

        return Response(encoded_pdf, status=200, mimetype='application/json')

    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


if __name__ == '__main__':
    logging.basicConfig()
    app.run()
