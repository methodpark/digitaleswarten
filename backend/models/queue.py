from app import db

class Queue(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    place_id = db.Column(db.String, db.ForeignKey('place.id'))
    place = db.relationship('Place', backref=db.backref('queues'))

    def __repr__(self):
        return f'<Queue {self.id}: [{self.slots}]>'
