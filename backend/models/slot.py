from app import db

class Slot(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return f'<Slot {id}>'