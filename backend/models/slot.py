from app import db

class Slot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    queue_id = db.Column(db.Integer, db.ForeignKey('queue.id'))
    queue = db.relationship('Queue', backref=db.backref('slots'))

    def __repr__(self):
        return f'<Slot {id}>'