from flask import Blueprint, request
from db_connection import mysql
from datetime import datetime

user_api = Blueprint('user_api', __name__)


@user_api.route('/create_user', methods=['POST'])
def create_user():
    user_type = 'user'
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('hashed_password')
        email = request.form.get('email')
    cur = mysql.connection.cursor()
    try:
        cur.execute(
            "INSERT INTO user(username, password, user_type, email) VALUES (%s, %s, %s, %s)", (username, password, user_type, email))
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()

    return """{} '{}' created successfully with email: {}""".format(user_type, username, email)


def verify_password(username, password):
    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT password FROM user WHERE username=%s", (username,))
        expected_password = cur.fetchone()[0]
        if password == expected_password:
            return True
        else:
            return False
    except Exception as e:
        return str(e)
    finally:
        cur.close()


@user_api.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('hashed_password')
    else:
        return "use a POST request"

    cur = mysql.connection.cursor()
    try:
        if verify_password(username, password):
            dt_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
            cur.execute(
                "UPDATE user SET last_login = %s WHERE username=%s", (dt_string, username))
            return """User '{}' login successfully""".format(username)
        else:
            return "Password is wrong"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()


@user_api.route('/update_password', methods=['POST'])
def update_password():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('hashed_password')
        new_password = request.form.get('new_hashed_password')
    else:
        return "use a POST request"

    cur = mysql.connection.cursor()
    try:
        if verify_password(username, password):
            cur.execute(
                "UPDATE user SET password = %s WHERE username=%s", (new_password, username))
            return """User '{}' password changed successfully""".format(username)
        else:
            return "Current password is wrong"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()


@user_api.route('/delete_user', methods=['DELETE'])
def delete_user():
    if request.method == 'DELETE':
        username = request.form.get('username')
        password = request.form.get('hashed_password')
    else:
        return "use a DELETE request"

    cur = mysql.connection.cursor()
    try:
        if verify_password(username, password):
            cur.execute(
                "DELETE FROM user WHERE username=%s", (username,))
            return """User '{}' deleted successfully""".format(username)
        else:
            return "Password is wrong"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()
