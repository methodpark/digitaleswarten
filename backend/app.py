# flask_web/app.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from pathlib import Path

SQLITE_FILE = '/db/digitalesWartenDB.sqlite'

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{SQLITE_FILE}'
db = SQLAlchemy(app)

if not Path.is_file(SQLITE_FILE):
    Path(SQLITE_FILE).parent.absolute().mkdir(parents=True, exist_ok=True)
    from models.slot import Slot
    from models.queue import Queue
    db.create_all()
    db.session.commit()
