from flask import Flask, request
from flask_cors import CORS, cross_origin

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

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#====================================
#   User
#====================================

@app.route("/user", methods=["POST"])
def registerUser():
    name = request.json['name']
    lastname = request.json['lastname']
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = user_pb2_grpc.userStub(channel)
        user = stub.register(user_pb2.RegisterRequest(
            name=name, lastname=lastname, email=email, username=username, password=password))
        userResponse = {
            "id": user.__getattribute__("id"),
            "name": user.__getattribute__("name"),
            "lastname": user.__getattribute__("lastname"),
            "email": user.__getattribute__("email"),
            "username": user.__getattribute__("username")
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
            "username": login.__getattribute__("username")
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

#====================================
#   Wallet
#====================================

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

#====================================
#   Product
#====================================

@app.route('/product', methods=['POST'])
def createProduct():
    name = request.json["name"]
    category = request.json["category"]
    quantity = int(request.json["quantity"])
    price = float(request.json["price"])
    date = request.json["date"]
    userId = int(request.json["userId"])
    photos = request.json["photos"]

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = product_pb2_grpc.productStub(channel)
        product = stub.create(product_pb2.RequestProduct(name=name, category=category,
                              quantity=quantity, price=price, date=date, userId=userId, photos=photos))
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
            "userId": product.__getattribute__("userId"),
            "photos": PHOTOS
        }

    return productResponse


@app.route('/product', methods=['GET'])
def getProduct():
    userId = int(request.args.get('userId')) if request.args.get('userId') is not None else None
    print(userId)
    userIdDistinct = int(request.args.get('userIdDistinct')) if request.args.get('userIdDistinct') is not None else None
    userIdPurchase = int(request.args.get('userIdPurchase')) if request.args.get('userIdPurchase') is not None else None
    name = request.args.get('name') if request.args.get('name') is not None else None
    category = request.args.get('category') if request.args.get('category') is not None else None
    priceMax = float(request.args.get('priceMax')) if request.args.get('priceMax') is not None else None
    priceMin = float(request.args.get('priceMin')) if request.args.get('priceMin') is not None else None
    dateInitial = request.args.get('dateInitial') if request.args.get('dateInitial') is not None else None
    dateFinal = request.args.get('dateFinal') if request.args.get('dateFinal') is not None else None

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = product_pb2_grpc.productStub(channel)
        
        if userId is not None:
            productList = stub.getProductByUserId(product_pb2.RequestProductByUserId(userId=userId))
        elif userIdDistinct is not None:
            productList = stub.getProductsDistinctByUserId(product_pb2.RequestProductByUserId(userId=userIdDistinct))
        elif userIdPurchase is not None:
            productList = stub.getProductByUserIdPurchase(product_pb2.RequestProductByUserId(userId=userIdPurchase))
        elif name is not None:
            productList = stub.getProductByName(product_pb2.RequestProductByName(name=name))
        elif category is not None:
            productList = stub.getProductByCategory(product_pb2.RequestProductByCategory(category=category))
        elif priceMax is not None and priceMin is not None:
            productList = stub.getProductByPrices(product_pb2.RequestProductByPrices(priceMin=priceMin, priceMax=priceMax))
        elif dateInitial is not None and dateFinal is not None:
            productList = stub.getProductByDates(product_pb2.RequestProductByDates(dateInitial=dateInitial, dateFinal=dateFinal))


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
                "name": product.__getattribute__("name"),
                "category": product.__getattribute__("category"),
                "quantity": product.__getattribute__("quantity"),
                "price": product.__getattribute__("price"),
                "date": product.__getattribute__("date"),
                "userId": product.__getattribute__("userId"),
                "photos": PHOTOS
            }

            PRODUCTS.append(productJson)

    productResponse = {
        "products": PRODUCTS
    }

    return productResponse

#====================================
#   ShoppingCart
#====================================

@app.route('/shoppingcart', methods=['POST'])
def toBuyShoppingCart():
    userCompraId = request.json["userCompraId"]
    itemCart = request.json["itemCart"]
    
    with grpc.insecure_channel('localhost:9090') as channel:
        stub = shoppingcart_pb2_grpc.shoppingcartStub(channel)
        response = stub.comprar(shoppingcart_pb2.RequestCart(userCompraId=userCompraId, itemCart=itemCart))
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

if __name__ == '__main__':
    logging.basicConfig()
    app.run()
