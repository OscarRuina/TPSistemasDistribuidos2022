from kafka import KafkaConsumer


def topics(group_id):
    consumer = KafkaConsumer(group_id=group_id, bootstrap_servers=[
        'localhost:9092'], api_version=(2, 6, 2), auto_offset_reset='earliest')

    TOPICS = []

    for topic in consumer.topics():
        TOPICS.append(topic)

    return TOPICS
