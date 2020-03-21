from app import db

class Slot(db.Model):
    id = db.Column(db.String, primary_key=True)
    queue_id = db.Column(db.String, db.ForeignKey('queue.id'))
    queue = db.relationship('Queue', backref=db.backref('slots'))
    ticket_number = db.Column(db.Integer)

    def __repr__(self):
        return f'<Slot {id}>'
