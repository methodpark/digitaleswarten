from app import db

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
