from app import db

class Queue(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return f'<Queue {self.id}: [{self.slots}]>'
