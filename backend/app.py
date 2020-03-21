# flask_web/app.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from pathlib import Path
import os

sqlite_location = '/db/digitalesWartenDB.sqlite'
if 'SQLITE_LOCATION' in os.environ:
    sqlite_location = os.environ['SQLITE_LOCATION']

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{sqlite_location}'
db = SQLAlchemy(app)

db_file = Path(sqlite_location)
if not db_file.is_file():
    db_file.parent.absolute().mkdir(parents=True, exist_ok=True)
    from models.slot import Slot
    from models.queue import Queue
    db.create_all()
    db.session.commit()
