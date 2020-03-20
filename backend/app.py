# flask_web/app.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////db/digitalesWartenDB.sqlite'
db = SQLAlchemy(app)
