import time
from flask import Blueprint

card_api = Blueprint('card_api',__name__)

@card_api.route('/time')
def get_current_time():

    return {'time': time.time()}