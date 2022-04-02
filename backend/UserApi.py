import time
from flask import Blueprint, request
from db_connection import mysql
import MySQLdb

user_api = Blueprint('user_api', __name__)


@user_api.route('/create_user', methods=['POST'])
def create_user():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('hashed_password')
    cur = mysql.connection.cursor()
    try:
        cur.execute(
            "INSERT INTO usertest(username, password) VALUES (%s, %s)", (username, password))
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()

    return {'time': username, 'card': password}
