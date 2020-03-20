from app import app

Slot_Counter = 0

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'


@app.route('/slot')
def print_slot():
    global Slot_Counter
    temp = Slot_Counter
    Slot_Counter += 1
    return str(temp)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
