from jsonschema import validate, ValidationError

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
