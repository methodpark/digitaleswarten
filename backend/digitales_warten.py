#!/usr/bin/env python3
from flask import request, abort, jsonify
from tornado.ioloop import IOLoop
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer

from app import app, db
from models.place import Place
from models.queue import Queue
from models.slot import Slot
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

@app.route('/places/<place_id>/queues', methods=['POST'])
def create_queue(place_id):
    if 'application/json' not in request.headers['Content-Type']:
        abort(400)
    data = request.json
    if 'queueName' not in data:
        abort(400)
    place = Place.query.filter_by(id=place_id).first()
    if place is None:
        abort(404)
    # Check password here
    queue_name = data['queueName']
    queue_id = generate_queue_id(queue_name)
    queue = Queue(id=queue_id, name=queue_name, place=place)
    db.session.add(queue)
    db.session.commit()
    return jsonify(id=queue.id, name=queue.name)


if __name__ == '__main__':
    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(5000)
    IOLoop.instance().start()
