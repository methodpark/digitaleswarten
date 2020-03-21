from app import db

class Queue(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return f'<Queue {self.id}: [{self.slots}]>'
