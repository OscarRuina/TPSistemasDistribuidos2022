from flask import Flask, request

import logging

import grpc
import user_pb2
import user_pb2_grpc

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"


@app.route("/user", methods=["POST"])
def registerUser():
    name = request.form['name']
    lastname = request.form['lastname']
    email = request.form['email']
    username = request.form['username']
    password = request.form['password']

    with grpc.insecure_channel('localhost:50051') as channel:
        stub = user_pb2_grpc.userServicer(channel)
        registeredUser = stub.register(user_pb2.RegisterRequest(
            name=name, lastname=lastname, email=email, username=username, password=password))

    registeredUserResponse = {
        "id": registeredUser["id"],
        "name": registeredUser["name"],
        "lastname": registeredUser["lastname"],
        "email": registeredUser["lastname"],
        "username": registeredUser["username"]
    }

    print("Registered User " + registeredUserResponse)
    return registeredUserResponse


@app.route("/user", methods=["GET"])
def getUser():
    userId = request.args.get('id')

    with grpc.insecure_channel('localhost:50051') as channel:
        stub = user_pb2_grpc.userServicer(channel)
        user = stub.get(user_pb2.GetById(id=userId))

        userResponse = {
            "id": user["id"],
            "name": user["name"],
            "lastname": user["lastname"],
            "email": user["lastname"],
            "username": user["username"]
        }

    print("User " + userId + " found")
    return userResponse
