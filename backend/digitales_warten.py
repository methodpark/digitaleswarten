from app import app, db
from models.slot import Slot
from models.queue import Queue

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'

@app.route('/queue', methods=['POST'])
def create_queue():
    queue = Queue()
    db.session.add(queue)
    db.session.commit()
    return str(queue.id)

@app.route('/queue/<queue_id>/slot', methods=['POST'])
def create_slot(queue_id):
    queue = Queue.query.filter_by(id=queue_id).first()
    slot = Slot(queue=queue)
    db.session.add(slot)
    db.session.commit()
    return str(slot.id)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
