from flask import Flask, request

import logging

import grpc
import user_pb2
import user_pb2_grpc
import wallet_pb2
import wallet_pb2_grpc

app = Flask(__name__)


@app.route("/user", methods=["POST"])
def registerUser():
    name = request.form['name']
    lastname = request.form['lastname']
    email = request.form['email']
    username = request.form['username']
    password = request.form['password']

    with grpc.insecure_channel('localhost:50051') as channel:
        stub = user_pb2_grpc.userStub(channel)
        response = stub.register(user_pb2.RegisterRequest(
            name=name, lastname=lastname, email=email, username=username, password=password))

    print("Registered User " + response)
    return response


@app.route("/user", methods=["GET"])
def getUser():
    userId = request.args.get('id')

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = user_pb2_grpc.userStub(channel)
        response = stub.get(user_pb2.GetById(id=userId))
        print(response)

    return response.__str__()


@app.route("/login", methods=["POST"])
def login():
    username = request.form['username']
    password = request.form['password']

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = user_pb2_grpc.userStub(channel)
        response = stub.login(user_pb2.LoginRequest(
            username=username, password=password))
        print(response)

    return response.__str__()


@app.route("/logout", methods=["POST"])
def logout():
    with grpc.insecure_channel('localhost:9090') as channel:
        stub = user_pb2_grpc.userStub(channel)
        response = stub.login(user_pb2.LogoutResponse())
        print(response)

    return response.__str__()


@app.route("/addWallet", methods=["POST"])
def addwallet():
    balance = int(request.json['balance'])
    userid = int(request.json['userId'])
    # registerRequestWallet = wallet_pb2_grpc.wallet Para ver las opciones que tiene.

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = wallet_pb2_grpc.walletStub(channel)
        response = stub.add(wallet_pb2.RegisterRequestWallet(
            balance=balance, userId=userid))

        #response = json.dumps(response.__str__())
        #response = response.__str__()
        #response = response.replace("\n", ",")
        #iid = response[0:5]
        # print(iid)
        print(response)

    return response.__str__()


@app.route('/subtractWallet', methods=['POST'])
def subtractwallet():
    balance = int(request.json["balance"])
    userid = int(request.json["userId"])

    with grpc.insecure_channel('localhost:9090') as channel:
        stub = wallet_pb2_grpc.walletStub(channel)
        response = stub.subtract(wallet_pb2.RegisterRequestWallet(
            balance=balance, userId=userid))
        print(response)

    return response.__str__()


if __name__ == '__main__':
    logging.basicConfig()
    app.run()
