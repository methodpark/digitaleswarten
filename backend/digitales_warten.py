#!/usr/bin/env python3
from flask import request, abort, jsonify
from tornado.ioloop import IOLoop
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer

from app import app, db
from sqlalchemy import desc
from models.place import Place
from models.queue import Queue
from models.entry import Entry
from utils.id_generator import generate_queue_id, generate_place_id, generate_entry_id

from tornado.log import enable_pretty_logging
import json
enable_pretty_logging()

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'

@app.route('/places', methods=['POST'])
def create_place():
    if 'application/json' not in request.headers['Content-Type']:
        abort(400)
    data = request.json
    if 'placeName' not in data:
        abort(400)
    place_name = data['placeName']
    # TODO: Password creation
    place_password = 'Admin'
    place_id = generate_place_id()
    new_place = Place(id=place_id, password=place_password, name=place_name)
    db.session.add(new_place)
    db.session.commit()
    return jsonify(id=new_place.id, name=new_place.name)


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

@app.route('/places/<place_id>/queues', methods=['GET'])
def get_queue_state(place_id):
    person_detail_level = request.args.get('personDetails', None)
    if person_detail_level not in ['short', 'full']:
        abort(400)

    place = Place.query.filter_by(id=place_id).first()
    if place is None:
        abort(404)
    
    attached_queues = Queue.query.filter_by(place=place).all()
    if not len(attached_queues):
        return json.dumps([])
    queue_states = []
    for attached_queue in attached_queues:
        queue_entries = []
        waiting_entries = Entry.query.filter_by(queue=attached_queue).all()
        if len(waiting_entries):
            entry = None
            for waiting_entry in waiting_entries:
                if 'short' == person_detail_level:
                    entry = get_short_entry(waiting_entry)
                if 'full' == person_detail_level:
                    entry = get_full_entry(waiting_entry)

                queue_entries.append(entry)
        
        queue = { 'id': attached_queue.id,
                  'name': attached_queue.name,
                  'entries': queue_entries
                }
        queue_states.append(queue)
    return json.dumps(queue_states)

def get_short_entry(entry):
    return { 'id': entry.id,
             'ticketNumber': entry.ticket_number
           } 


def get_full_entry(entry):
    return { 'id': entry.id,
             'name': entry.name,
             'ticketNumber': entry.ticket_number
           } 
    

@app.route('/places/<place_id>/queues/<queue_id>', methods=['DELETE'])
def delete_queue(place_id, queue_id):
    place = Place.query.filter_by(id=place_id).first()
    if place is None:
        abort(404)
    queue = Queue.query.filter_by(id=queue_id) \
                       .filter_by(place=place).first()
    if queue is None:
        abort(404)
    db.session.delete(queue)
    db.session.commit()
    return ''

@app.route('/places/<place_id>/queues/<queue_id>/entries', methods=['POST'])
def add_entry(place_id, queue_id):
    place = Place.query.filter_by(id=place_id).first()
    if place is None:
        abort(404)
    queue = Queue.query.filter_by(id=queue_id).filter_by(place=place).first()
    if queue is None:
        abort(404)
    data = request.json
    if 'name' not in data:
        abort(400)
    entry_name = data['name']
    entry_id = generate_entry_id(entry_name)
    largest_previous_entry = db.session.query(Entry).filter_by(queue=queue).order_by(desc(Entry.ticket_number)).limit(1).first()
    ticket_number = largest_previous_entry.ticket_number + 1 if largest_previous_entry else 1
    entry = Entry(id=entry_id, name=entry_name, queue=queue, ticket_number=ticket_number)
    db.session.add(entry)
    db.session.commit()
    return jsonify(id=entry_id, name=entry_name, ticketNumber=ticket_number)

@app.route('/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['DELETE'])
def delete_entry(place_id, queue_id, entry_id):
    place = Place.query.filter_by(id=place_id).first()
    if place is None:
        abort(404)

    queue = Queue.query.filter_by(id=queue_id) \
                       .filter_by(place=place).first()
    if queue is None:
        abort(404)

    entry = Entry.query.filter_by(id=entry_id) \
                       .filter_by(queue=queue).first()
    if entry is None:
        abort(404)
    db.session.delete(entry)
    db.session.commit()
    return ''


if __name__ == '__main__':
    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(5000)
    IOLoop.instance().start()
