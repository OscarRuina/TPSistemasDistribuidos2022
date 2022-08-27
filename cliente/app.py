from flask import Flask

import logging

import grpc
import helloworld_pb2
import helloworld_pb2_grpc

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/helloWorldCliente", methods=["GET"])
def grpcMessage():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = helloworld_pb2_grpc.GreeterStub(channel)
        response = stub.SayHello(helloworld_pb2.HelloRequest(name='you'))
    print("Greeter client received: " + response.message)
    return "Greeter client received: " + response.message
