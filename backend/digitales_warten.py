#!/usr/bin/env python3
from flask import request, abort, jsonify
from tornado.ioloop import IOLoop
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer

from app import app, db
from models.place import add_new_place_to_db, add_new_place_to_db_with_place_id
from models.queue import Queue, add_new_queue_to_db
from models.entry import Entry, add_new_entry_to_db
from utils import handle_json
from utils import database_lookup
from utils import handle_get_queries

from tornado.log import enable_pretty_logging
import json
enable_pretty_logging()

import random

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'

@app.route('/api/v1/places', methods=['POST'])
@app.route('/places', methods=['POST'])
def create_place():
    data = handle_json.get_places_json_data(request)
    place_name = data['placeName']

    # TODO: Password creation
    place_password = 'Admin'

    new_place = add_new_place_to_db(db, place_name, place_password)

    return jsonify(id=new_place.id, name=new_place.name)


@app.route('/api/v1/places/<place_id>/queues', methods=['POST'])
@app.route('/places/<place_id>/queues', methods=['POST'])
def create_queue(place_id):
    data = handle_json.get_queue_json_data(request)
    queue_name = data['queueName']

    place = database_lookup.get_place(place_id)

    if place is None:
        # TODO: How to create password in this case?
        place = add_new_place_to_db_with_place_id(db, place_id, place_id, '')

    # TODO: Check password here

    new_queue = add_new_queue_to_db(db, place, queue_name)

    return jsonify(id=new_queue.id, name=new_queue.name)


@app.route('/api/v1/places/<place_id>/queues', methods=['GET'])
@app.route('/places/<place_id>/queues', methods=['GET'])
def get_queue_state(place_id):
    entry_level_detail = handle_get_queries.get_entry_detail_level(request) 

    place = database_lookup.get_place_if_exists(place_id)
    return json.dumps(gather_places_queues_state(place, entry_level_detail))

def gather_places_queues_state(place, entry_level_detail):
    """
    Returns the place's queues state including their entries.
    """
    attached_queues = database_lookup.get_all_queues_of_place(place)
    if not len(attached_queues):
        return []
    queue_states = []
    for attached_queue in attached_queues:
        queue_states.append(gather_queues_entries(attached_queue, entry_level_detail))
    return queue_states


def gather_queues_entries(queue, entry_level_detail):
    """
    Returns a queue's state and entries.
    """
    queue_entries = []
    waiting_entries = database_lookup.get_all_entries_of_queue(queue)
    if len(waiting_entries):
        entry = None
        for waiting_entry in waiting_entries:
            if 'short' == entry_level_detail:
                entry = waiting_entry.short_json()
            if 'full' == entry_level_detail:
                entry = waiting_entry.full_json()

            queue_entries.append(entry)
    
    return queue.json(queue_entries)


@app.route('/api/v1/places/<place_id>/queues/<queue_id>', methods=['DELETE'])
@app.route('/places/<place_id>/queues/<queue_id>', methods=['DELETE'])
def delete_queue(place_id, queue_id):
    place = database_lookup.get_place_if_exists(place_id)
    queue = database_lookup.get_queue_if_exists(place, queue_id)

    db.session.delete(queue)
    db.session.commit()
    return ''


@app.route('/api/v1/places/<place_id>/queues/<queue_id>/entries', methods=['POST'])
@app.route('/places/<place_id>/queues/<queue_id>/entries', methods=['POST'])
def create_entry(place_id, queue_id):
    data = handle_json.get_entries_json_data(request)
    entry_name = data['name']

    place = database_lookup.get_place_if_exists(place_id)
    queue = database_lookup.get_queue_if_exists(place, queue_id)

    new_entry = add_new_entry_to_db(db, queue, entry_name)

    return jsonify(id=new_entry.id,
                   name=new_entry.name,
                   ticketNumber=new_entry.ticket_number)

@app.route('/api/v1/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['DELETE'])
@app.route('/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['DELETE'])
def delete_entry(place_id, queue_id, entry_id):
    place = database_lookup.get_place_if_exists(place_id)
    queue = database_lookup.get_queue_if_exists(place, queue_id)
    entry = database_lookup.get_entry_if_exists(queue, entry_id)

    db.session.delete(entry)
    db.session.commit()
    return ''

@app.route('/api/v1/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['PUT'])
@app.route('/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['PUT'])
def update_entry_state(place_id, queue_id, entry_id):
    data = handle_json.get_entries_state_json_data(request)
    new_entry_state = data['state']

    place = database_lookup.get_place_if_exists(place_id)
    queue = database_lookup.get_queue_if_exists(place, queue_id)
    entry = database_lookup.get_entry_if_exists(queue, entry_id)

    if not entry.set_state(new_entry_state):
        abort(400)
    db.session.commit()
    return jsonify(ticketNumber=entry.ticket_number,
                   name=entry.name,
                   state=entry.state)

@app.route('/api/v1/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['GET'])
@app.route('/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['GET'])
def query_entry_state(place_id, queue_id, entry_id):
    person_detail_level = handle_get_queries.get_entry_state_query(request)

    place = database_lookup.get_place_if_exists(place_id)
    queue = database_lookup.get_queue_if_exists(place, queue_id)
    entry = database_lookup.get_entry_if_exists(queue, entry_id)

    return jsonify(id=entry.id,
                   ticketNumber=entry.ticket_number,
                   name=entry.name,
                   state=entry.state)


if __name__ == '__main__':
    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(5000)
    IOLoop.instance().start()

@app.route('/api/v1/places/<place_id>/<ticket_id>', methods=['GET'])
@app.route('/places/<place_id>/<ticket_id>', methods=['GET'])
def inform_patient(place_id, ticket_id):
    """
    # TODO Calculate the number of tickets before this one.
    # TODO Inform frontend that this user has been called by returning true
    # TODO Implement as websocket
    """
    return jsonify(queueSize=5, hasBeenCalledToFrontdesk=(random.random()<0.2))
