# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import invoice_pb2 as invoice__pb2


class invoiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.listInvoices = channel.unary_unary(
                '/invoice/listInvoices',
                request_serializer=invoice__pb2.buyerId.SerializeToString,
                response_deserializer=invoice__pb2.getInvoices.FromString,
                )


class invoiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def listInvoices(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_invoiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'listInvoices': grpc.unary_unary_rpc_method_handler(
                    servicer.listInvoices,
                    request_deserializer=invoice__pb2.buyerId.FromString,
                    response_serializer=invoice__pb2.getInvoices.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'invoice', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class invoice(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def listInvoices(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/invoice/listInvoices',
            invoice__pb2.buyerId.SerializeToString,
            invoice__pb2.getInvoices.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)