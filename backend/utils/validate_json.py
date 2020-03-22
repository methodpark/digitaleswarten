from jsonschema import validate, ValidationError

def validate_schema(data, schema):
    try:
        validate(data, schema=schema)
        return True
    except ValidationError:
        return False

def validate_places_post(data):
    schema = {
        'placeName': 'string'
    }
    return validate_schema(data, schema)

def validate_queues_post(data):
    schema = {
        'queueName': 'string'
    }
    return validate_schema(data, schema)
