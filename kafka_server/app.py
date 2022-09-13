from flask import Flask, request, Response
from topics import topics
from consumer import consumer_groups, get_messages
from producer import produce_messages
import json
import logging

app = Flask(__name__)


@app.route("/topics", methods=["GET"])
def get_topics():
    group_id = request.args.get('groupId') if request.args.get(
        'groupId') is not None else 'default'
    return topics(group_id)


@app.route("/consumer-groups", methods=["GET"])
def get_consumer_groups():
    return consumer_groups()


@app.route("/messages", methods=["GET"])
def get_consumer_messages():
    response = ''
    group_id = request.args.get('groupId') if request.args.get(
        'groupId') is not None else 'default'
    if request.args.get('topic'):
        topic = request.args.get('topic')
        message = json.dumps(get_messages(topic, group_id))
        response = Response(message, status=200, mimetype='application/json')
    else:
        message = json.dumps({"error": "missing topic"})
        response = Response(message, status=400, mimetype='application/json')
    return response


@app.route("/messages", methods=["POST"])
def submit_messages():
    response = ''
    if request.args.get('topic'):
        topic = request.args.get('topic')
        orders = request.json["orders"]
        message = json.dumps(produce_messages(topic, orders))
        response = Response(message, status=200, mimetype='application/json')
    else:
        message = json.dumps({"error": "missing topic"})
        response = Response(message, status=400, mimetype='application/json')
    return response


if __name__ == '__main__':
    logging.basicConfig()
    app.run()
