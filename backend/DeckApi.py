import time
from flask import Blueprint

deck_api = Blueprint('deck_api',__name__)

@deck_api.route('/time')
def get_current_time():
    return {'time': time.time()}