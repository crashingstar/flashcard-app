import time
from flask import Blueprint, request
from datetime import datetime
from .db_connection import mysql

deck_api = Blueprint('deck_api', __name__)


@deck_api.route('/create_deck', methods=['POST'])
def create_deck():
    if request.method == 'POST':
        deck_name = request.form.get('deck_name')
        user_id = request.form.get('user_id')
        accessibility = 0

        # 0 for private
    else:
        return "use a POST request"

    dt_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    cur = mysql.connection.cursor()
    try:
        cur.execute(
            "INSERT INTO deck(deck_name, user_id, accessibility, date_created) VALUES (%s, %s, %s, %s)", (deck_name, user_id, accessibility, dt_string))
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()

    return {'deck_id': get_deck_id(deck_name, user_id)}

def get_deck_id(deck_name, user_id):
    cur = mysql.connection.cursor()
    try:
        cur.execute(
            "SELECT deck_id FROM deck WHERE deck_name=%s AND user_id=%s", (deck_name, user_id))
        deck_id = cur.fetchone()[0]
        return deck_id
    except Exception as e:
        return str(e)
    finally:
        cur.close()

@deck_api.route('/get_deck_details', methods=['POST'])
def get_deck_details():
    if request.method == 'POST':
        deck_id = request.form.get('deck_id')
    else:
        return "use a POST request"

    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT * FROM deck WHERE deck_id=%s", (deck_id,))
        return parse_one_row_result(cur)
    except Exception as e:
        return str(e)
    finally:
        cur.close()


@deck_api.route('/get_all_deck_details', methods=['POST'])
def get_all_deck_details():
    if request.method == 'POST':
        pass
    else:
        return "use a POST request"
    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT * FROM deck")
        return parse_all_result(cur)
    except Exception as e:
        return str(e)
    finally:
        cur.close()


@deck_api.route('/update_deck_details', methods=['POST'])
def update_deck_details():
    if request.method == 'POST':
        deck_id = request.form.get('deck_id')
        user_id = request.form.get('user_id')
        details_dic = request.form.to_dict()
    else:
        return "use a POST request"

    cur = mysql.connection.cursor()
    try:
        if verify_user_id(deck_id, user_id):
            sql = 'UPDATE deck SET {}'.format(
                ', '.join('{}=%s'.format(k) for k in details_dic))
            dic_values = list(details_dic.values())
            dic_values.append(deck_id)
            dic_values.append(user_id)
            cur.execute(sql + ' WHERE deck_id=%s AND user_id=%s',
                        tuple(dic_values))
            return "Updated succesfully"
        else:
            return "Deck does not belong to user"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()


@deck_api.route('/delete_deck', methods=['DELETE'])
def delete_deck():
    if request.method == 'DELETE':
        deck_id = request.form.get('deck_id')
        user_id = request.form.get('user_id')
    else:
        return "use a DELETE request"

    cur = mysql.connection.cursor()
    try:
        if verify_user_id(deck_id, user_id) == True:
            cur.execute(
                'DELETE FROM deck WHERE deck_id=%s AND user_id=%s', (deck_id, user_id))
            return "Delete succesfully"
        else:
            return "Deck does not belong to user or Deck does not exist"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()

@deck_api.route('/update_total_cards', methods=['POST'])
def update_total_cards():
    if request.method == 'POST':
        pass
    else:
        return "use a POST request"

    cur = mysql.connection.cursor()
    try:
        cur.execute('UPDATE deck SET deck.total_cards = (SELECT count(*) FROM card WHERE card.deck_id = deck.deck_id)')
        return "Updated succesfully"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()

        
@deck_api.route('/delete_all_user_deck', methods=['DELETE'])
def delete_all_user_deck():
    if request.method == 'DELETE':
        user_id = request.form.get('user_id')
    else:
        return "use a DELETE request"

    cur = mysql.connection.cursor()
    try:
        if True:  # To add password/user verification
            cur.execute(
                'DELETE FROM deck WHERE user_id=%s', (user_id,))
            return "Delete All deck belonging to user succesfully"
        else:
            return "Deck does not belong to user or Deck does not exist"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()


def parse_one_row_result(cur):
    fields = [field_md[0] for field_md in cur.description]
    result = dict(zip(fields, list(cur.fetchone())))
    return result


def parse_all_result(cur):
    fields = [field_md[0] for field_md in cur.description]
    # result = [dict(zip(fields, row)) for row in cur.fetchall()]
    result = {row[0]: dict(zip(fields, row)) for row in cur.fetchall()}
    print(result)
    return result


def verify_user_id(deck_id, user_id):
    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT user_id FROM deck WHERE deck_id=%s", (deck_id,))
        expected_user_id = cur.fetchone()[0]
        if user_id == str(expected_user_id):
            return True
        else:
            return False
    except Exception as e:
        return str(e)
    finally:
        cur.close()
