# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: wallet.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0cwallet.proto\"8\n\x15RegisterRequestWallet\x12\x0f\n\x07\x62\x61lance\x18\x01 \x01(\x01\x12\x0e\n\x06userId\x18\x02 \x01(\x03\"E\n\x16RegisterResponseWallet\x12\n\n\x02id\x18\x01 \x01(\x03\x12\x0f\n\x07\x62\x61lance\x18\x02 \x01(\x01\x12\x0e\n\x06userId\x18\x03 \x01(\x03\"$\n\x11ResponseAPIWallet\x12\x0f\n\x07message\x18\x01 \x01(\t2x\n\x06wallet\x12\x36\n\x03\x61\x64\x64\x12\x16.RegisterRequestWallet\x1a\x17.RegisterResponseWallet\x12\x36\n\x08subtract\x12\x16.RegisterRequestWallet\x1a\x12.ResponseAPIWalletB\x1d\n\x19\x63om.unla.servicegrpc.grpcP\x01\x62\x06proto3')



_REGISTERREQUESTWALLET = DESCRIPTOR.message_types_by_name['RegisterRequestWallet']
_REGISTERRESPONSEWALLET = DESCRIPTOR.message_types_by_name['RegisterResponseWallet']
_RESPONSEAPIWALLET = DESCRIPTOR.message_types_by_name['ResponseAPIWallet']
RegisterRequestWallet = _reflection.GeneratedProtocolMessageType('RegisterRequestWallet', (_message.Message,), {
  'DESCRIPTOR' : _REGISTERREQUESTWALLET,
  '__module__' : 'wallet_pb2'
  # @@protoc_insertion_point(class_scope:RegisterRequestWallet)
  })
_sym_db.RegisterMessage(RegisterRequestWallet)

RegisterResponseWallet = _reflection.GeneratedProtocolMessageType('RegisterResponseWallet', (_message.Message,), {
  'DESCRIPTOR' : _REGISTERRESPONSEWALLET,
  '__module__' : 'wallet_pb2'
  # @@protoc_insertion_point(class_scope:RegisterResponseWallet)
  })
_sym_db.RegisterMessage(RegisterResponseWallet)

ResponseAPIWallet = _reflection.GeneratedProtocolMessageType('ResponseAPIWallet', (_message.Message,), {
  'DESCRIPTOR' : _RESPONSEAPIWALLET,
  '__module__' : 'wallet_pb2'
  # @@protoc_insertion_point(class_scope:ResponseAPIWallet)
  })
_sym_db.RegisterMessage(ResponseAPIWallet)

_WALLET = DESCRIPTOR.services_by_name['wallet']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\031com.unla.servicegrpc.grpcP\001'
  _REGISTERREQUESTWALLET._serialized_start=16
  _REGISTERREQUESTWALLET._serialized_end=72
  _REGISTERRESPONSEWALLET._serialized_start=74
  _REGISTERRESPONSEWALLET._serialized_end=143
  _RESPONSEAPIWALLET._serialized_start=145
  _RESPONSEAPIWALLET._serialized_end=181
  _WALLET._serialized_start=183
  _WALLET._serialized_end=303
# @@protoc_insertion_point(module_scope)