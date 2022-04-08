# from flask import Flask
from CardApi import card_api
from DeckApi import deck_api
from UserApi import user_api
from db_connection import app

# app = Flask(__name__)

# app.config['MYSQL_PASSWORD'] = 'toor'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_DB'] = 'flashcardapp'
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_PORT'] = '3306'


app.register_blueprint(card_api, url_prefix="/card")
app.register_blueprint(deck_api, url_prefix="/deck")
app.register_blueprint(user_api, url_prefix="/user")

if __name__ == "__main__":
    app.run()
