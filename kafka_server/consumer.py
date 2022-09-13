from kafka import KafkaAdminClient, KafkaConsumer, TopicPartition, OffsetAndMetadata
from json import loads


def consumer_groups():
    client = KafkaAdminClient(
        bootstrap_servers=['localhost:9092'], api_version=(2, 6, 2))

    CONSUMER_GROUPS = []

    for group in client.list_consumer_groups():
        CONSUMER_GROUPS.append({"group_id": group[0]})

    return CONSUMER_GROUPS


def get_consumer_total_lag(consumer, topic):
    PARTITIONS = []

    for partition in consumer.partitions_for_topic(topic):
        tp = TopicPartition(topic, partition)
        PARTITIONS.append(tp)

    end_offset = consumer.end_offsets(PARTITIONS)

    COMMITTED = 0
    CONSUMER_TOTAL_LAG = 0
    TOTAL_END_OFFSETS = 0

    for partition in PARTITIONS:
        committed = 0 if consumer.committed(
            partition) is None else int(consumer.committed(partition))
        COMMITTED = COMMITTED + committed
        TOTAL_END_OFFSETS = TOTAL_END_OFFSETS + end_offset[partition]

    CONSUMER_TOTAL_LAG = int(TOTAL_END_OFFSETS - COMMITTED)
    return CONSUMER_TOTAL_LAG


def get_messages(topic, group_id):

    response = {"topic": topic, "messages": []}
    consumer = KafkaConsumer(topic, group_id=group_id, bootstrap_servers=['localhost:9092'], api_version=(
        2, 6, 2), auto_offset_reset='earliest', enable_auto_commit=False, max_poll_records=100, value_deserializer=lambda x: loads(x.decode('utf-8')))

    if get_consumer_total_lag(consumer, topic) == 0:
        response['consumer_total_lag'] = 0
    else:
        msg_pack = consumer.poll(timeout_ms=10000, update_offsets=True)

        for partition, messages in msg_pack.items():
            for message in messages:
                response['messages'].append(
                    {"message": message.value, "partition": message.partition, "offset": message.offset})
                consumer.commit({TopicPartition(topic, int(
                    message.partition)): OffsetAndMetadata(int(message.offset)+1, '')})

        response['consumer_total_lag'] = get_consumer_total_lag(
            consumer, topic)

    return response
