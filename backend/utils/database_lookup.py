from flask import abort

from models.entry import Entry
from models.place import Place
from models.queue import Queue

def get_place_if_exists(place_id):
    """
    Returns the place linked to the place id.
    Throws a 404 otherwise.
    """
    place = get_place(place_id)
    if place is None:
        abort(404)
    return place

def get_place_by_public_id(public_place_id):
    """
    Finds places linked to the public place id.
    Throws a 404 otherwise.
    """
    place = Place.query.filter_by(public_id=public_place_id).first()
    if place is None:
        abort(404)
    return place


def get_place(place_id):
    """
    Returns the place linked to the place id.
    Returns None if place does not exist
    """
    return Place.query.filter_by(id=place_id).first()

def get_queue_if_exists(place, queue_id):
    """
    Returns the queue of a place linked to the queue id.
    Throws a 404 otherwise.
    """
    queue = Queue.query.filter_by(id=queue_id) \
                       .filter_by(place=place).first()
    if queue is None:
        abort(404)
    return queue

def get_entry_if_exists(queue, entry_id):
    """
    Returns the entry in a queue of a place linked to the entry_id.
    Throws a 404 otherwise.
    """
    entry = Entry.query.filter_by(id=entry_id) \
                       .filter_by(queue=queue).first()
    if entry is None:
        abort(404)
    return entry


def get_all_queues_of_place(place):
    """
    Returns all entries of a queue or an empty list if no entries are present.
    """
    return Queue.query.filter_by(place=place).all()


def get_all_entries_of_queue(queue):
    """
    Returns all entries of a queue or an empty list if no entries are present.
    """
    return Entry.query.filter_by(queue=queue).all()
