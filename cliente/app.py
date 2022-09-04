from flask import Flask, request

import logging

import grpc
import user_pb2
import user_pb2_grpc
import wallet_pb2
import wallet_pb2_grpc

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"


@app.route("/user", methods=["POST"])
def registerUser():
    name = request.json['name']
    lastname = request.json['lastname']
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = user_pb2_grpc.userStub(channel)
        user = stub.register(user_pb2.RegisterRequest(name=name, lastname=lastname, email=email, username=username, password=password))
        print(user)

        userResponse = {
            "id": user.__getattribute__("id"),
            "name": user.__getattribute__("name"),
            "lastname": user.__getattribute__("lastname"),
            "email": user.__getattribute__("email"),
            "username": user.__getattribute__("username")
        }
    return userResponse


@app.route("/user", methods=["GET"])
def getUser():
    #userId = request.args.get('id')
    userId = int(request.json['id'])

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = user_pb2_grpc.userStub(channel)
        user = stub.get(user_pb2.GetById(id=userId))    #Me devuelve una estructura

        userResponse = {
            "id": user.__getattribute__("id"),
            "name": user.__getattribute__("name"),
            "lastname": user.__getattribute__("lastname"),
            "email": user.__getattribute__("email"),
            "username": user.__getattribute__("username")
        }
        print(userResponse)

    return userResponse


@app.route("/addWallet", methods=["POST"])
def addwallet():
    balance = int(request.json['balance'])
    userid = int(request.json['userId'])
    #registerRequestWallet = wallet_pb2_grpc.wallet Para ver las opciones que tiene.

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = wallet_pb2_grpc.walletStub(channel)
        response = stub.add(wallet_pb2.RegisterRequestWallet(balance=balance, userId=userid))
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
        response = stub.subtract(wallet_pb2.RegisterRequestWallet(balance=balance, userId=userid))
        print(response)

        json = {
            "message": response.__getattribute__("message"),
        }

    return json

if __name__ == '__main__':
	logging.basicConfig()
	app.run()