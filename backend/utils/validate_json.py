from flask import abort
from jsonschema import validate, ValidationError

def has_json_header(request):
    """
    Checks if a request contains json content.
    Throws 400 otherwise.
    """
    if 'application/json' not in request.headers['Content-Type']:
        abort(400)


def validate_format(data, schema):
    if not set(data.keys()) == set(schema['properties'].keys()):
        raise ValidationError('')


def validate_schema(data, schema):
    try:
        validate(data, schema=schema)
        validate_format(data, schema=schema)
        return True
    except ValidationError:
        return False


def validate_places_post(data):
    schema = {
        'type': 'object',
        'properties':
        {
            'placeName': {'type': 'string'},
        },
    }
    return validate_schema(data, schema)


def validate_queues_post(data):
    schema = {
        'type': 'object',
        'properties':
        {
            'queueName': {'type': 'string'},
        },
    }
    return validate_schema(data, schema)


def validate_entries_post(data):
    schema = {
        'type': 'object',
        'properties':
        {
            'name': {'type': 'string'},
        },
    }
    return validate_schema(data, schema)


def validate_entry_state_set(data):
    schema = {
        'type': 'object',
        'properties':
        {
            'state': {'type': 'string'},
        },
    }
    return validate_schema(data, schema)


def validate_put_name_storage(data):
    schema = {
        'type': 'object',
        'properties':
        {
            'nameStorage': {'type': 'boolean'},
        },
    }
    return validate_schema(data, schema)
