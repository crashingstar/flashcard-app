from flask import Flask
# from flaskext.mysql import MySQL
from CardApi import card_api
from DeckApi import deck_api
from UserApi import user_api

app = Flask(__name__)
# mysql = MySQL()
# app.config['MYSQL_DATABASE_USER'] = 'admin'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'admin'
# app.config['MYSQL_DATABASE_DB'] = 'flashcardapp'
# app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1:3306'
# mysql.init_app(app)

app.register_blueprint(card_api, url_prefix="/card")
app.register_blueprint(deck_api, url_prefix="/deck")
app.register_blueprint(user_api, url_prefix="/user")

if __name__ == "__main__":
    app.run()

