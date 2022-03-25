import time
from flask import Blueprint

user_api = Blueprint('user_api',__name__)

# @app.route('/user/create')
# def create_user():
#     cursor = mysql.connection.cursor()
#     cursor.execute(''' INSERT INTO user VALUES(1,user1,password,admin,20-3-2022,teezhiyao@gmail) ''')
#     mysql.connection.commit()
#     return {'time': time.time()}