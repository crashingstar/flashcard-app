from flask_mysqldb import MySQL
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'toor'
app.config['MYSQL_DB'] = 'flashcardapp'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
mysql = MySQL(app)