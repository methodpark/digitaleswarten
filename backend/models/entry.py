from flask import abort
from sqlalchemy import desc
from sqlalchemy.exc import IntegrityError

from app import db
from utils.id_generator import generate_entry_id

class Entry(db.Model):
    id = db.Column(db.String, primary_key=True)
    queue_id = db.Column(db.String, db.ForeignKey('queue.id'), primary_key=True)
    queue = db.relationship('Queue', backref=db.backref('slots'))
    name = db.Column(db.String)
    ticket_number = db.Column(db.Integer)
    state = db.Column(db.String, default='waiting')

    def set_state(self, new_state):
        """
        Modifies the state of an entry in the queue.
        Args:
            - new_state (String): must either be "waiting" or "called"
        Returns:
            - (Bool): True on success, False if the entered value was not in
                      the value range
        """
        if new_state not in ['waiting', 'called']:
            return False
        self.state = new_state
        return True

    def __repr__(self):
        return f'<Entry {id}>'

    def short_json(self):
        return {
                 'id': self.id,
                 'ticket_number' : self.ticket_number
               }

    def full_json(self):
        return {
                 'id': self.id,
                 'name': self.name,
                 'ticket_number' : self.ticket_number
               }


def add_new_entry_to_db(db, queue, entry_name):
    """
    Creates a new queue with queue_name and returns.
    """
    entry_id = generate_entry_id(entry_name)
    largest_previous_entry = db.session.query(Entry) \
                                       .filter_by(queue=queue) \
                                       .order_by(desc(Entry.ticket_number)) \
                                       .limit(1) \
                                       .first()
    if largest_previous_entry is None:
        ticket_number = 1
    else:
        ticket_number = largest_previous_entry.ticket_number + 1

    try:
        new_entry = Entry(id=entry_id, name=entry_name, queue=queue, ticket_number=ticket_number)
        db.session.add(new_entry)
        db.session.commit()
    except IntegrityError:
        abort(500)
    return new_entry 
