from flask import abort
from utils import validate_json

def get_places_json_data(request):
    """
    Returns the json data from a place request.
    If either no json is present or the json is malformed a 400 if thrown.
    """
    validate_json.has_json_header(request)
    data = request.json
    if not validate_json.validate_places_post(data):
        abort(400)
    return data


def get_queue_json_data(request):
    """
    Returns the json data from a queue request.
    If either no json is present or the json is malformed a 400 if thrown.
    """
    validate_json.has_json_header(request)
    data = request.json
    if not validate_json.validate_queues_post(data):
        abort(400)
    return data


def get_entries_json_data(request):
    """
    Returns the json data from a entries request.
    If either no json is present or the json is malformed a 400 if thrown.
    """
    validate_json.has_json_header(request)
    data = request.json
    if not validate_json.validate_entries_post(data):
        abort(400)
    return data


def get_entries_state_json_data(request):
    """
    Returns the json data from a entries state request.
    If either no json is present or the json is malformed a 400 if thrown.
    """
    validate_json.has_json_header(request)
    data = request.json
    if not validate_json.validate_entry_state_set(data):
        abort(400)
    return data



def get_name_storage(request):
    """
    Returns the name should be stored or throws 400 otherwise.
    """
    validate_json.has_json_header(request)
    data = request.json
    if not validate_json.validate_put_name_storage(data):
        abort(400)
    return data
