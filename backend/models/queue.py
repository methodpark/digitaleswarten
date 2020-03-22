from flask import abort
from sqlalchemy.exc import IntegrityError

from app import db
from utils.id_generator import generate_queue_id

class Queue(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    place_id = db.Column(db.String, db.ForeignKey('place.id'), primary_key=True)
    place = db.relationship('Place', backref=db.backref('queues'))

    def __repr__(self):
        return f'<Queue {self.id}: [{self.slots}]>'

    def json(self, entries):
        return {
                'id': self.id,
                'name': self.name,
                'entries': entries
                }



def add_new_queue_to_db(db, place, queue_name):
    """
    Creates a new queue with queue_name and returns.
    """
    queue_id = generate_queue_id(queue_name)
    try:
        new_queue = Queue(id=queue_id, name=queue_name, place=place)
        db.session.add(new_queue)
        db.session.commit()
    except IntegrityError:
        abort(500)
    return new_queue
