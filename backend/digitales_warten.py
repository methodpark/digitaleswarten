#!/usr/bin/env python3
from flask import request, abort, jsonify
from tornado.ioloop import IOLoop
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer

from app import app, db
from models.place import add_new_place_to_db
from models.queue import Queue, add_new_queue_to_db
from models.entry import Entry, add_new_entry_to_db
from utils import handle_json
from utils import database_lookup

from tornado.log import enable_pretty_logging
import json
enable_pretty_logging()

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'

@app.route('/places', methods=['POST'])
def create_place():
    data = handle_json.get_places_json_data(request)
    place_name = data['placeName']

    # TODO: Password creation
    place_password = 'Admin'

    new_place = add_new_place_to_db(db, place_name, place_password)

    return jsonify(id=new_place.id, name=new_place.name)


@app.route('/places/<place_id>/queues', methods=['POST'])
def create_queue(place_id):
    data = handle_json.get_queue_json_data(request)
    queue_name = data['queueName']

    place = database_lookup.get_place_if_exists(place_id)

    # TODO: Check password here

    new_queue = add_new_queue_to_db(db, place, queue_name)

    return jsonify(id=new_queue.id, name=new_queue.name)


@app.route('/places/<place_id>/queues', methods=['GET'])
def get_queue_state(place_id):
    person_detail_level = request.args.get('personDetails', None)
    if person_detail_level not in ['short', 'full']:
        abort(400)


    place = database_lookup.get_place_if_exists(place_id)
    
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
    place = database_lookup.get_place_if_exists(place_id)
    queue = database_lookup.get_queue_if_exists(place, queue_id)

    db.session.delete(queue)
    db.session.commit()
    return ''

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

@app.route('/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['DELETE'])
def delete_entry(place_id, queue_id, entry_id):
    place = database_lookup.get_place_if_exists(place_id)
    queue = database_lookup.get_queue_if_exists(place, queue_id)
    entry = database_lookup.get_entry_if_exists(place, queue, entry_id)

    db.session.delete(entry)
    db.session.commit()
    return ''

@app.route('/places/<place_id>/queues/<queue_id>/entries/<entry_id>', methods=['PUT'])
def update_entry_state(place_id, queue_id, entry_id):
    data = handle_json.get_entries_state_json_data(request)
    new_entry_state = data['state']

    place = database_lookup.get_place_if_exists(place_id)
    queue = database_lookup.get_queue_if_exists(place, queue_id)
    entry = database_lookup.get_entry_if_exists(place, queue, entry_id)

    if not entry.set_state(new_entry_state):
        abort(400)
    db.session.commit()
    return jsonify(ticketNumber=entry.ticket_number,
                   name=entry.name,
                   state=entry.state)


if __name__ == '__main__':
    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(5000)
    IOLoop.instance().start()
