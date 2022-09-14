from kafka import KafkaProducer
import json


def json_serializer(data):
    jsonData = json.dumps(data).encode("utf-8")
    return jsonData


def produce_messages(topic, orders):

    if isinstance(orders, list):

        producer = KafkaProducer(
            bootstrap_servers=['localhost:9092'], value_serializer=json_serializer,
            api_version=(2, 6, 2))

        response = {"offsets": []}

        for order in orders:
            response_offset = {"partition": 0, "offset": 0}

            retorno = producer.send(topic, order)

            response_offset["partition"] = retorno.get()[1]
            response_offset["offset"] = retorno.get()[3]
            response["offsets"].append(response_offset)

    else:
        response = {"message": "body must be list"}

    return response
