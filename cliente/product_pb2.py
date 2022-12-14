# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: product.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\rproduct.proto\"\x0e\n\x0c\x45mptyRequest\"\xc4\x01\n\x0eRequestProduct\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x10\n\x08\x63\x61tegory\x18\x02 \x01(\t\x12\x10\n\x08quantity\x18\x03 \x01(\x05\x12\r\n\x05price\x18\x04 \x01(\x01\x12\x0c\n\x04\x64\x61te\x18\x05 \x01(\t\x12\x12\n\nat_auction\x18\x06 \x01(\x08\x12\x0e\n\x06userId\x18\x07 \x01(\x03\x12\x17\n\x06photos\x18\x08 \x03(\x0b\x32\x07.Photos\x12\x13\n\x0b\x61\x63tualPrice\x18\t \x01(\x01\x12\x11\n\tfinalDate\x18\n \x01(\t\"\xd1\x01\n\x0fResponseProduct\x12\n\n\x02id\x18\x01 \x01(\x03\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x10\n\x08\x63\x61tegory\x18\x03 \x01(\t\x12\x10\n\x08quantity\x18\x04 \x01(\x05\x12\r\n\x05price\x18\x05 \x01(\x01\x12\x0c\n\x04\x64\x61te\x18\x06 \x01(\t\x12\x12\n\nat_auction\x18\x07 \x01(\x08\x12\x0e\n\x06userId\x18\x08 \x01(\x03\x12\x17\n\x06photos\x18\t \x03(\x0b\x32\x07.Photos\x12\x13\n\x0b\x61\x63tualPrice\x18\n \x01(\x01\x12\x11\n\tfinalDate\x18\x0b \x01(\t\"\x1a\n\x05getId\x12\x11\n\tproductId\x18\x01 \x01(\x03\"\xfa\x01\n\x15UpdateResponseProduct\x12\n\n\x02id\x18\x01 \x01(\x03\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x10\n\x08\x63\x61tegory\x18\x03 \x01(\t\x12\x10\n\x08quantity\x18\x04 \x01(\x05\x12\r\n\x05price\x18\x05 \x01(\x01\x12\x0c\n\x04\x64\x61te\x18\x06 \x01(\t\x12\x12\n\nat_auction\x18\x07 \x01(\x08\x12\x0e\n\x06userId\x18\x08 \x01(\x03\x12\x17\n\x06photos\x18\t \x03(\x0b\x32\x07.Photos\x12\x13\n\x0b\x61\x63tualPrice\x18\n \x01(\x01\x12\x11\n\tfinalDate\x18\x0b \x01(\t\x12\x0f\n\x07nameOld\x18\x0c \x01(\t\x12\x10\n\x08priceOld\x18\r \x01(\x01\"/\n\x0bgetProducts\x12 \n\x08products\x18\x01 \x03(\x0b\x32\x0e.ProductObject\"\xa7\x01\n\rProductObject\x12\n\n\x02id\x18\x01 \x01(\x03\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x10\n\x08\x63\x61tegory\x18\x03 \x01(\t\x12\x10\n\x08quantity\x18\x04 \x01(\x05\x12\r\n\x05price\x18\x05 \x01(\x01\x12\x0c\n\x04\x64\x61te\x18\x06 \x01(\t\x12\x12\n\nat_auction\x18\x07 \x01(\x08\x12\x17\n\x06photos\x18\x08 \x03(\x0b\x32\x07.Photos\x12\x0e\n\x06userId\x18\t \x01(\x03\"$\n\x06Photos\x12\r\n\x05order\x18\x01 \x01(\x05\x12\x0b\n\x03url\x18\x02 \x01(\t\"(\n\x16RequestProductByUserId\x12\x0e\n\x06userId\x18\x01 \x01(\x03\"$\n\x14RequestProductByName\x12\x0c\n\x04name\x18\x01 \x01(\t\",\n\x18RequestProductByCategory\x12\x10\n\x08\x63\x61tegory\x18\x01 \x01(\t\"<\n\x16RequestProductByPrices\x12\x10\n\x08priceMin\x18\x01 \x01(\x01\x12\x10\n\x08priceMax\x18\x02 \x01(\x01\"?\n\x15RequestProductByDates\x12\x13\n\x0b\x64\x61teInitial\x18\x01 \x01(\t\x12\x11\n\tdateFinal\x18\x02 \x01(\t2\xeb\x04\n\x07product\x12+\n\x06\x63reate\x12\x0f.RequestProduct\x1a\x10.ResponseProduct\x12\x32\n\x06update\x12\x10.ResponseProduct\x1a\x16.UpdateResponseProduct\x12\x44\n\x1bgetProductsDistinctByUserId\x12\x17.RequestProductByUserId\x1a\x0c.getProducts\x12\x45\n\x1cgetProductsInAuctionByUserId\x12\x17.RequestProductByUserId\x1a\x0c.getProducts\x12;\n\x12getProductByUserId\x12\x17.RequestProductByUserId\x1a\x0c.getProducts\x12\x43\n\x1agetProductByUserIdPurchase\x12\x17.RequestProductByUserId\x1a\x0c.getProducts\x12\x37\n\x10getProductByName\x12\x15.RequestProductByName\x1a\x0c.getProducts\x12?\n\x14getProductByCategory\x12\x19.RequestProductByCategory\x1a\x0c.getProducts\x12;\n\x12getProductByPrices\x12\x17.RequestProductByPrices\x1a\x0c.getProducts\x12\x39\n\x11getProductByDates\x12\x16.RequestProductByDates\x1a\x0c.getProductsB\x1d\n\x19\x63om.unla.servicegrpc.grpcP\x01\x62\x06proto3')



_EMPTYREQUEST = DESCRIPTOR.message_types_by_name['EmptyRequest']
_REQUESTPRODUCT = DESCRIPTOR.message_types_by_name['RequestProduct']
_RESPONSEPRODUCT = DESCRIPTOR.message_types_by_name['ResponseProduct']
_GETID = DESCRIPTOR.message_types_by_name['getId']
_UPDATERESPONSEPRODUCT = DESCRIPTOR.message_types_by_name['UpdateResponseProduct']
_GETPRODUCTS = DESCRIPTOR.message_types_by_name['getProducts']
_PRODUCTOBJECT = DESCRIPTOR.message_types_by_name['ProductObject']
_PHOTOS = DESCRIPTOR.message_types_by_name['Photos']
_REQUESTPRODUCTBYUSERID = DESCRIPTOR.message_types_by_name['RequestProductByUserId']
_REQUESTPRODUCTBYNAME = DESCRIPTOR.message_types_by_name['RequestProductByName']
_REQUESTPRODUCTBYCATEGORY = DESCRIPTOR.message_types_by_name['RequestProductByCategory']
_REQUESTPRODUCTBYPRICES = DESCRIPTOR.message_types_by_name['RequestProductByPrices']
_REQUESTPRODUCTBYDATES = DESCRIPTOR.message_types_by_name['RequestProductByDates']
EmptyRequest = _reflection.GeneratedProtocolMessageType('EmptyRequest', (_message.Message,), {
  'DESCRIPTOR' : _EMPTYREQUEST,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:EmptyRequest)
  })
_sym_db.RegisterMessage(EmptyRequest)

RequestProduct = _reflection.GeneratedProtocolMessageType('RequestProduct', (_message.Message,), {
  'DESCRIPTOR' : _REQUESTPRODUCT,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:RequestProduct)
  })
_sym_db.RegisterMessage(RequestProduct)

ResponseProduct = _reflection.GeneratedProtocolMessageType('ResponseProduct', (_message.Message,), {
  'DESCRIPTOR' : _RESPONSEPRODUCT,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:ResponseProduct)
  })
_sym_db.RegisterMessage(ResponseProduct)

getId = _reflection.GeneratedProtocolMessageType('getId', (_message.Message,), {
  'DESCRIPTOR' : _GETID,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:getId)
  })
_sym_db.RegisterMessage(getId)

UpdateResponseProduct = _reflection.GeneratedProtocolMessageType('UpdateResponseProduct', (_message.Message,), {
  'DESCRIPTOR' : _UPDATERESPONSEPRODUCT,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:UpdateResponseProduct)
  })
_sym_db.RegisterMessage(UpdateResponseProduct)

getProducts = _reflection.GeneratedProtocolMessageType('getProducts', (_message.Message,), {
  'DESCRIPTOR' : _GETPRODUCTS,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:getProducts)
  })
_sym_db.RegisterMessage(getProducts)

ProductObject = _reflection.GeneratedProtocolMessageType('ProductObject', (_message.Message,), {
  'DESCRIPTOR' : _PRODUCTOBJECT,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:ProductObject)
  })
_sym_db.RegisterMessage(ProductObject)

Photos = _reflection.GeneratedProtocolMessageType('Photos', (_message.Message,), {
  'DESCRIPTOR' : _PHOTOS,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:Photos)
  })
_sym_db.RegisterMessage(Photos)

RequestProductByUserId = _reflection.GeneratedProtocolMessageType('RequestProductByUserId', (_message.Message,), {
  'DESCRIPTOR' : _REQUESTPRODUCTBYUSERID,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:RequestProductByUserId)
  })
_sym_db.RegisterMessage(RequestProductByUserId)

RequestProductByName = _reflection.GeneratedProtocolMessageType('RequestProductByName', (_message.Message,), {
  'DESCRIPTOR' : _REQUESTPRODUCTBYNAME,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:RequestProductByName)
  })
_sym_db.RegisterMessage(RequestProductByName)

RequestProductByCategory = _reflection.GeneratedProtocolMessageType('RequestProductByCategory', (_message.Message,), {
  'DESCRIPTOR' : _REQUESTPRODUCTBYCATEGORY,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:RequestProductByCategory)
  })
_sym_db.RegisterMessage(RequestProductByCategory)

RequestProductByPrices = _reflection.GeneratedProtocolMessageType('RequestProductByPrices', (_message.Message,), {
  'DESCRIPTOR' : _REQUESTPRODUCTBYPRICES,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:RequestProductByPrices)
  })
_sym_db.RegisterMessage(RequestProductByPrices)

RequestProductByDates = _reflection.GeneratedProtocolMessageType('RequestProductByDates', (_message.Message,), {
  'DESCRIPTOR' : _REQUESTPRODUCTBYDATES,
  '__module__' : 'product_pb2'
  # @@protoc_insertion_point(class_scope:RequestProductByDates)
  })
_sym_db.RegisterMessage(RequestProductByDates)

_PRODUCT = DESCRIPTOR.services_by_name['product']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\031com.unla.servicegrpc.grpcP\001'
  _EMPTYREQUEST._serialized_start=17
  _EMPTYREQUEST._serialized_end=31
  _REQUESTPRODUCT._serialized_start=34
  _REQUESTPRODUCT._serialized_end=230
  _RESPONSEPRODUCT._serialized_start=233
  _RESPONSEPRODUCT._serialized_end=442
  _GETID._serialized_start=444
  _GETID._serialized_end=470
  _UPDATERESPONSEPRODUCT._serialized_start=473
  _UPDATERESPONSEPRODUCT._serialized_end=723
  _GETPRODUCTS._serialized_start=725
  _GETPRODUCTS._serialized_end=772
  _PRODUCTOBJECT._serialized_start=775
  _PRODUCTOBJECT._serialized_end=942
  _PHOTOS._serialized_start=944
  _PHOTOS._serialized_end=980
  _REQUESTPRODUCTBYUSERID._serialized_start=982
  _REQUESTPRODUCTBYUSERID._serialized_end=1022
  _REQUESTPRODUCTBYNAME._serialized_start=1024
  _REQUESTPRODUCTBYNAME._serialized_end=1060
  _REQUESTPRODUCTBYCATEGORY._serialized_start=1062
  _REQUESTPRODUCTBYCATEGORY._serialized_end=1106
  _REQUESTPRODUCTBYPRICES._serialized_start=1108
  _REQUESTPRODUCTBYPRICES._serialized_end=1168
  _REQUESTPRODUCTBYDATES._serialized_start=1170
  _REQUESTPRODUCTBYDATES._serialized_end=1233
  _PRODUCT._serialized_start=1236
  _PRODUCT._serialized_end=1855
# @@protoc_insertion_point(module_scope)
