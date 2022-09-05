# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import product_pb2 as product__pb2


class productStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.create = channel.unary_unary(
                '/product/create',
                request_serializer=product__pb2.RequestProduct.SerializeToString,
                response_deserializer=product__pb2.ResponseProduct.FromString,
                )
        self.update = channel.unary_unary(
                '/product/update',
                request_serializer=product__pb2.ResponseProduct.SerializeToString,
                response_deserializer=product__pb2.UpdateResponseProduct.FromString,
                )
        self.getProductsDistinctByUserId = channel.unary_unary(
                '/product/getProductsDistinctByUserId',
                request_serializer=product__pb2.RequestProductByUserId.SerializeToString,
                response_deserializer=product__pb2.getProducts.FromString,
                )
        self.getProductByUserId = channel.unary_unary(
                '/product/getProductByUserId',
                request_serializer=product__pb2.RequestProductByUserId.SerializeToString,
                response_deserializer=product__pb2.getProducts.FromString,
                )
        self.getProductByName = channel.unary_unary(
                '/product/getProductByName',
                request_serializer=product__pb2.RequestProductByName.SerializeToString,
                response_deserializer=product__pb2.getProducts.FromString,
                )
        self.getProductByCategory = channel.unary_unary(
                '/product/getProductByCategory',
                request_serializer=product__pb2.RequestProductByCategory.SerializeToString,
                response_deserializer=product__pb2.getProducts.FromString,
                )
        self.getProductByPrices = channel.unary_unary(
                '/product/getProductByPrices',
                request_serializer=product__pb2.RequestProductByPrices.SerializeToString,
                response_deserializer=product__pb2.getProducts.FromString,
                )
        self.getProductByDates = channel.unary_unary(
                '/product/getProductByDates',
                request_serializer=product__pb2.RequestProductByDates.SerializeToString,
                response_deserializer=product__pb2.getProducts.FromString,
                )


class productServicer(object):
    """Missing associated documentation comment in .proto file."""

    def create(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def update(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getProductsDistinctByUserId(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getProductByUserId(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getProductByName(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getProductByCategory(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getProductByPrices(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getProductByDates(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_productServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'create': grpc.unary_unary_rpc_method_handler(
                    servicer.create,
                    request_deserializer=product__pb2.RequestProduct.FromString,
                    response_serializer=product__pb2.ResponseProduct.SerializeToString,
            ),
            'update': grpc.unary_unary_rpc_method_handler(
                    servicer.update,
                    request_deserializer=product__pb2.ResponseProduct.FromString,
                    response_serializer=product__pb2.UpdateResponseProduct.SerializeToString,
            ),
            'getProductsDistinctByUserId': grpc.unary_unary_rpc_method_handler(
                    servicer.getProductsDistinctByUserId,
                    request_deserializer=product__pb2.RequestProductByUserId.FromString,
                    response_serializer=product__pb2.getProducts.SerializeToString,
            ),
            'getProductByUserId': grpc.unary_unary_rpc_method_handler(
                    servicer.getProductByUserId,
                    request_deserializer=product__pb2.RequestProductByUserId.FromString,
                    response_serializer=product__pb2.getProducts.SerializeToString,
            ),
            'getProductByName': grpc.unary_unary_rpc_method_handler(
                    servicer.getProductByName,
                    request_deserializer=product__pb2.RequestProductByName.FromString,
                    response_serializer=product__pb2.getProducts.SerializeToString,
            ),
            'getProductByCategory': grpc.unary_unary_rpc_method_handler(
                    servicer.getProductByCategory,
                    request_deserializer=product__pb2.RequestProductByCategory.FromString,
                    response_serializer=product__pb2.getProducts.SerializeToString,
            ),
            'getProductByPrices': grpc.unary_unary_rpc_method_handler(
                    servicer.getProductByPrices,
                    request_deserializer=product__pb2.RequestProductByPrices.FromString,
                    response_serializer=product__pb2.getProducts.SerializeToString,
            ),
            'getProductByDates': grpc.unary_unary_rpc_method_handler(
                    servicer.getProductByDates,
                    request_deserializer=product__pb2.RequestProductByDates.FromString,
                    response_serializer=product__pb2.getProducts.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'product', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class product(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def create(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/product/create',
            product__pb2.RequestProduct.SerializeToString,
            product__pb2.ResponseProduct.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def update(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/product/update',
            product__pb2.ResponseProduct.SerializeToString,
            product__pb2.UpdateResponseProduct.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def getProductsDistinctByUserId(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/product/getProductsDistinctByUserId',
            product__pb2.RequestProductByUserId.SerializeToString,
            product__pb2.getProducts.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def getProductByUserId(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/product/getProductByUserId',
            product__pb2.RequestProductByUserId.SerializeToString,
            product__pb2.getProducts.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def getProductByName(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/product/getProductByName',
            product__pb2.RequestProductByName.SerializeToString,
            product__pb2.getProducts.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def getProductByCategory(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/product/getProductByCategory',
            product__pb2.RequestProductByCategory.SerializeToString,
            product__pb2.getProducts.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def getProductByPrices(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/product/getProductByPrices',
            product__pb2.RequestProductByPrices.SerializeToString,
            product__pb2.getProducts.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def getProductByDates(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/product/getProductByDates',
            product__pb2.RequestProductByDates.SerializeToString,
            product__pb2.getProducts.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
