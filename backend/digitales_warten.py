from app import app, db
from models.slot import Slot

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'


@app.route('/slot')
def print_slot():
    slot = Slot()
    db.session.add(slot)
    db.session.commit()
    return str(slot.id)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
