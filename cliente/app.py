from multiprocessing.sharedctypes import Value
from flask import Flask, request, Response
from flask_cors import CORS
from topics import topics
from consumer import consumer_groups, get_messages
from producer import produce_messages
from pdf_generator import pdf_generator
import json
import base64

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

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# ====================================
#   User
# ====================================


@app.route("/user", methods=["POST"])
def registerUser():
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
        print(userResponse)
    return userResponse


@app.route("/user", methods=["GET"])
def getUser():
    userId = int(request.args.get('id'))
    # userId = int(request.json['id'])

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = user_pb2_grpc.userStub(channel)
        # Me devuelve una estructura
        user = stub.get(user_pb2.GetById(id=userId))

        userResponse = {
            "id": user.__getattribute__("id"),
            "name": user.__getattribute__("name"),
            "lastname": user.__getattribute__("lastname"),
            "email": user.__getattribute__("email"),
            "username": user.__getattribute__("username")
        }
        print(userResponse)

    return userResponse


@app.route("/login", methods=["POST"])
def login():
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
        print(loginResponse)

    return loginResponse


@app.route("/logout", methods=["POST"])
def logout():
    with grpc.insecure_channel('localhost:9090') as channel:
        stub = user_pb2_grpc.userStub(channel)
        logout = stub.logout(user_pb2.LogoutResponse())
        logoutResponse = {
            "message": logout.__getattribute__("message")
        }
        print(logoutResponse)

    return logoutResponse

# ====================================
#   Wallet
# ====================================


@app.route("/addWallet", methods=["POST"])
def addwallet():
    balance = int(request.json['balance'])
    userid = int(request.json['userId'])
    # registerRequestWallet = wallet_pb2_grpc.wallet Para ver las opciones que tiene.

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = wallet_pb2_grpc.walletStub(channel)
        response = stub.add(wallet_pb2.RegisterRequestWallet(
            balance=balance, userId=userid))
        print(response)

        json = {
            "id": response.__getattribute__("id"),
            "balance": response.__getattribute__("balance"),
            "userId": response.__getattribute__("userId"),
        }

    return json


@app.route('/subtractWallet', methods=['POST'])
def subtractwallet():
    balance = int(request.json["balance"])
    userid = int(request.json["userId"])

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = wallet_pb2_grpc.walletStub(channel)
        response = stub.subtract(wallet_pb2.RegisterRequestWallet(
            balance=balance, userId=userid))
        print(response)

        json = {
            "message": response.__getattribute__("message"),
        }

    return json

# ====================================
#   Product
# ====================================


@app.route('/product', methods=['POST'])
def createProduct():
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
        print(product)

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
            "photos": PHOTOS
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


@app.route('/updproduct', methods=['POST'])
def updateProduct():
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
        print(product)

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
            "photos": PHOTOS
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


@app.route('/product', methods=['GET'])
def getProduct():

    print(request.args)
    userIdDistinct = int(request.args.get('userIdDistinct')) if request.args.get(
        'userIdDistinct') is not None else None

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = product_pb2_grpc.productStub(channel)

        productList = stub.getProductsDistinctByUserId(
            product_pb2.RequestProductByUserId(userId=userIdDistinct))

        PRODUCTS = []

        for product in productList.__getattribute__("products"):
            print(product)

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


@app.route('/productAution', methods=['GET'])
def getProductAution():

    print(request.args)
    userIdDistinct = int(request.args.get('userId')) if request.args.get(
        'userIdDistinct') is not None else None

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = product_pb2_grpc.productStub(channel)

        productList = stub.getProductsInAuctionByUserId(
            product_pb2.RequestProductByUserId(userId=userIdDistinct))

        PRODUCTS = []

        for product in productList.__getattribute__("products"):
            print(product)

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

# ====================================
#   ShoppingCart
# ====================================


@app.route('/shoppingcart', methods=['POST'])
def toBuyShoppingCart():
    userCompraId = request.json["userCompraId"]
    itemCart = request.json["itemCart"]

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = shoppingcart_pb2_grpc.shoppingcartStub(channel)
        response = stub.comprar(shoppingcart_pb2.RequestCart(
            userCompraId=userCompraId, itemCart=itemCart))
        print(response)

        ITEMPRODUCT = []

        for item in response.__getattribute__("itemProduct"):
            photosJson = {
                "id": item.__getattribute__("id"),
                "name": item.__getattribute__("name"),
                "category": item.__getattribute__("category"),
                "itemQuantity": item.__getattribute__("itemQuantity"),
                "price": item.__getattribute__("price")
            }
            ITEMPRODUCT.append(photosJson)

        userCompra = response.__getattribute__("userCompra")

        Compra = {
            "userCompraId": userCompra.__getattribute__("userCompraId"),
            "username": userCompra.__getattribute__("username")
        }
        productResponse = {
            "itemProduct": ITEMPRODUCT,
            "shoppingCartId": response.__getattribute__("shoppingCartId"),
            "precioFinal": response.__getattribute__("precioFinal"),
            "userCompra": Compra
        }

    return productResponse

@app.route('/shoppingcartUserPurchase', methods=['GET'])
def userPurchaseShoppingCart():
    userId = int(request.args.get('userId'))

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = shoppingcart_pb2_grpc.shoppingcartStub(channel)
        responseCart = stub.listUserPurchaseShoppingCart(shoppingcart_pb2.getIdUser(
            userId=userId))
        print(responseCart)

        RESPONSECART = []

        for response in responseCart.__getattribute__("responseCart"):

            ITEMPRODUCT = []

            for item in response.__getattribute__("itemProduct"):
                photosJson = {
                    "id": item.__getattribute__("id"),
                    "name": item.__getattribute__("name"),
                    "category": item.__getattribute__("category"),
                    "itemQuantity": item.__getattribute__("itemQuantity"),
                    "price": item.__getattribute__("price")
                }
                ITEMPRODUCT.append(photosJson)

            userCompra = response.__getattribute__("userCompra")

            Compra = {
                "userCompraId": userCompra.__getattribute__("userCompraId"),
                "username": userCompra.__getattribute__("username")
            }
            productResponse = {
                "itemProduct": ITEMPRODUCT,
                "shoppingCartId": response.__getattribute__("shoppingCartId"),
                "precioFinal": response.__getattribute__("precioFinal"),
                "userCompra": Compra
            }

            RESPONSECART.append(productResponse)

        CartResponse = {
            "responseCart": RESPONSECART
        }

    return CartResponse


# ====================================
#   Auction
# ====================================

@app.route('/Auction', methods=['POST'])
def toBuyAuction():
    userId = int(request.json["userId"])
    productId = int(request.json["productId"])
    total = float(request.json["total"])

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = auction_pb2_grpc.auctionStub(channel)
        response = stub.getAuctionsByUserPurchase(auction_pb2.RegisterAuction(
            userId=userId, productId=productId, total=total))
        print(response)

        AuctionResponse = {
            "id": response.__getattribute__("id"),
            "name": response.__getattribute__("userId"),
            "lastname": response.__getattribute__("productId"),
            "email": response.__getattribute__("total"),
            "date": response.__getattribute__("date")
        }

    return AuctionResponse


@app.route('/Auction', methods=['GET'])
def toGetAuction():
    userId = int(request.args.get('userId')) if request.args.get(
        'userId') is not None else None

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = auction_pb2_grpc.auctionStub(channel)
        response = stub.comprar(auction_pb2.RegisterAuction(
            userId=userId))
        print(response)

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


@app.route("/topics", methods=["GET"])
def get_topics():
    group_id = request.args.get('groupId') if request.args.get(
        'groupId') is not None else 'default'
    return topics(group_id)


@app.route("/consumer-groups", methods=["GET"])
def get_consumer_groups():
    return consumer_groups()


@app.route("/messages", methods=["GET"])
def get_consumer_messages():
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


@app.route("/messages", methods=["POST"])
def submit_messages():
    response = ''
    try:
        if request.args.get('topic'):
            topic = request.args.get('topic')
            if request.json.get(topic) is None:
                raise ValueError(
                    "The body does not contain same messages as topic")
            messages = request.json[topic]
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

        pdf = pdf_generator(invoice_id, purchase_date,
                            seller, buyer, products, total_amount)

        return Response(base64.b64encode(str(pdf).encode()), status=200, mimetype='application/json')
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')


if __name__ == '__main__':
    logging.basicConfig()
    app.run()
