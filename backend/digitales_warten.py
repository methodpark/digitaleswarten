#!/usr/bin/env python3
from flask import request, abort, jsonify
from app import app, db
from models.slot import Slot
from models.queue import Queue
from utils.id_generator import generate_queue_id

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'

@app.route('/queue/<queue_id>/slot', methods=['POST'])
def create_slot(queue_id):
    queue = Queue.query.filter_by(id=queue_id).first()
    slot = Slot(queue=queue)
    db.session.add(slot)
    db.session.commit()
    return str(slot.id)

@app.route('/place/<place_id>/queues', methods=['POST'])
def create_queue(place_id):
    if 'application/json' not in request.headers['Content-Type']:
        abort(400)
    data = request.json
    if 'queueName' not in data:
        abort(400)
    # Check password here
    queueName = data['queueName']
    queue_id = generate_queue_id(queueName)
    queue = Queue(id=queue_id, name=queueName)
    db.session.add(queue)
    db.session.commit()
    return jsonify(id=queue.id, name=queue.name)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
