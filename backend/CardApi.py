from telnetlib import NEW_ENVIRON
import time
from flask import Blueprint, request
import datetime
from db_connection import mysql

card_api = Blueprint('card_api', __name__)

@card_api.route('/get_card', methods=['POST'])
def get_card():
    if request.method != 'POST':
         return "use a POST request"

    dt_string = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    cur = mysql.connection.cursor()
    try:
        cur.execute(
            "SELECT * FROM card ")
        data = parse_all_result(cur)
        print(data)
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()
    return data

@card_api.route('/create_card', methods=['POST'])
def create_card():
    if request.method == 'POST':
        front = request.form.get('front')
        back = request.form.get('back')
        deck_id = request.form.get('deck_id')

    else:
        return "use a POST request"
    dt_string = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    cur = mysql.connection.cursor()
    try:
        cur.execute(
            "INSERT INTO card(deck_id, front, back, date_created) VALUES (%s, %s, %s, %s)", (deck_id, front, back, dt_string))
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()
    return {'card_id': get_card_id(front, deck_id)}


@card_api.route('/delete_card', methods=['DELETE'])
def delete_card():
    if request.method == 'DELETE':
        card_id = request.form.get('card_id')
        deck_id = request.form.get('deck_id')
        user_id = request.form.get('user_id')
    else:
        return "use a DELETE request"

    cur = mysql.connection.cursor()
    try:
        if verify_user_id(deck_id, user_id) == True:
            cur.execute(
                'DELETE FROM card WHERE card_id=%s AND deck_id=%s', (card_id, deck_id))
            return "Delete succesfully"
        else:
            return "Card does not belong to deck/user or Card does not exist"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()


@card_api.route('/update_card_details', methods=['POST'])
def update_card_details():
    if request.method == 'POST':
        deck_id = request.form.get('deck_id')
        card_id = request.form.get('card_id')
        user_id = request.form.get('user_id')
        details_dic = request.form.to_dict()
    else:
        return "use a POST request"

    cur = mysql.connection.cursor()
    try:
        if verify_user_id(deck_id, user_id):
            sql = 'UPDATE card SET {}'.format(
                ', '.join('{}=%s'.format(k) for k in details_dic))
            dic_values = list(details_dic.values())
            dic_values.append(deck_id)
            dic_values.append(card_id)
            cur.execute(sql + ' WHERE deck_id=%s AND card_id=%s',
                        tuple(dic_values))
            return "Updated succesfully"
        else:
            return "Card does not belong to Deck/User"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()


@card_api.route('/update_card_interval', methods=['POST'])
def update_card_interval():
    if request.method == 'POST':
        deck_id = request.form.get('deck_id')
        card_id = request.form.get('card_id')
        user_id = request.form.get('user_id')
        response_quality = int(request.form.get('response_quality'))
    else:
        return "use a POST request"

    cur = mysql.connection.cursor()
    try:
        if verify_user_id(deck_id, user_id):
            cur.execute(
                "SELECT `card_status`, `learning_status`, `interval`,`ease_factor` FROM card WHERE card_id=%s", (card_id,))
            card_status, learning_status, interval, ease_factor = cur.fetchone()
            min_ease_factor = 1.3
            # Indicates number of learning status available, 1 correspond to 1 min, 2 correspond to 5 min, 3 correspond to 10min
            learning_status_num = 3
            if response_quality == 0:  # again
                card_status = "Learning"
                learning_status = 1
                ease_factor = max(min_ease_factor, ease_factor - 0.2)

            elif response_quality == 1 and card_status == "Review":  # Hard
                interval *= 1.2
                ease_factor = max(min_ease_factor, ease_factor - 0.15)
                # if card_status == Learning, no change
                # if card_status == Review, new_interval = interval * 1.2, new_ease_factor = ease_factor - 0.15
            elif response_quality == 2:  # Good
                learning_status += 1
                learning_status = min(learning_status_num, learning_status)
                if learning_status == learning_status_num:
                    card_status = "Review"
                    interval *= ease_factor
                # if card_status == Learning, learning status improve/move on to next
                # if card_status == Review, new_interval = interval * Ease Factor,
            elif response_quality == 3:  # Easy
                learning_status = learning_status_num
                card_status = "Review"
                interval *= ease_factor
                ease_factor += 0.15
                # if card_status == card status to Review
                # if card_status == Review, new_interval = interval * Ease Factor, new_ease_factor = ease_factor + 0.15
            dt_string = (datetime.datetime.today() +
                         datetime.timedelta(days=interval)).strftime('%Y-%m-%d')
            cur.execute('UPDATE card SET `card_status` = %s, `learning_status` = %s, `interval` = %s, `ease_factor` = %s,`next_accessed` = %s WHERE card_id=%s',
                        (card_status, learning_status, interval, ease_factor, dt_string, card_id))

            return "Updated succesfully"
        else:
            return "Card does not belong to Deck/User"
    except Exception as e:
        return str(e)
    finally:
        mysql.connection.commit()
        cur.close()


def get_card_id(front, deck_id):
    cur = mysql.connection.cursor()
    try:
        cur.execute(
            "SELECT card_id FROM card WHERE front=%s AND deck_id=%s", (front, deck_id))
        card_id = cur.fetchone()[0]
        print(card_id)
        return card_id
    except Exception as e:
        return str(e)
    finally:
        cur.close()


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

def parse_all_result(cur):
    fields = [field_md[0] for field_md in cur.description]
    # result = [dict(zip(fields, row)) for row in cur.fetchall()]
    result = {row[0]: dict(zip(fields, row)) for row in cur.fetchall()}
    print(result)
    return result
