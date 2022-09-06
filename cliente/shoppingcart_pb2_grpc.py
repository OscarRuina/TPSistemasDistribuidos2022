# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import shoppingcart_pb2 as shoppingcart__pb2


class shoppingcartStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.comprar = channel.unary_unary(
                '/shoppingcart/comprar',
                request_serializer=shoppingcart__pb2.RequestCart.SerializeToString,
                response_deserializer=shoppingcart__pb2.ResponseCart.FromString,
                )


class shoppingcartServicer(object):
    """Missing associated documentation comment in .proto file."""

    def comprar(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_shoppingcartServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'comprar': grpc.unary_unary_rpc_method_handler(
                    servicer.comprar,
                    request_deserializer=shoppingcart__pb2.RequestCart.FromString,
                    response_serializer=shoppingcart__pb2.ResponseCart.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'shoppingcart', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class shoppingcart(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def comprar(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/shoppingcart/comprar',
            shoppingcart__pb2.RequestCart.SerializeToString,
            shoppingcart__pb2.ResponseCart.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)