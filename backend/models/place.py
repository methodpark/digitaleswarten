from flask import abort
from sqlalchemy.exc import IntegrityError

from app import db
from werkzeug.security import generate_password_hash
from utils.id_generator import generate_place_id
import logging

class Place(db.Model):
    id = db.Column(db.String, primary_key=True)
    password = db.Column(db.String)
    name = db.Column(db.String)

    def __repr__(self):
        return f'<Place {self.id}>'

def generate_default_place():
    """
        This function is only here until a method has been implemented
        to generate new places. Until then, we'll create a default place.
    """
    password = 'Admin'
    password_hash = generate_password_hash(password, 'sha256')
    place_id = generate_place_id()
    logging.warning(f'==== Generated default place is: {place_id}')
    return Place(id=place_id, password=password_hash)

def add_new_place_to_db(db, place_name, place_password):
    """
    Creates a new place with place_name and returns.
    """
    place_id = generate_place_id()
    return add_new_place_to_db_with_place_id(db, place_id, place_name, place_password)

def add_new_place_to_db_with_place_id(db, place_id, place_name, place_password):
    """
    Creates a new place with place_name, place_id and returns
    """
    try:
        new_place = Place(id=place_id, password=place_password, name=place_name)
        db.session.add(new_place)
        db.session.commit()
    except IntegrityError:
        abort(500)
    return new_place
