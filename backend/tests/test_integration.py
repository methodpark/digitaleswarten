import json
import os
import pytest
import requests

class TestBackendIntegration:
    host_name = os.getenv('BACKEND_HOSTNAME', default='backend')
    host = f'http://{host_name}:5000'

    @pytest.fixture
    def place_id(self):
        place_response = requests.post(f'{self.host}/places', json={'placeName': 'TestPraxis'})
        return place_response.json()['id']

    @pytest.fixture
    def queue_id(self, place_id):
        queue_response = requests.post(f'{self.host}/places/{place_id}/queues',
                                       json={'queueName': 'TestQueue'})
        return queue_response.json()['id']

    def test_create_place(self, place_id):
        assert place_id

    def test_create_queue(self, queue_id):
        assert queue_id

    def test_get_queue_state(self, place_id, queue_id):
        place_response = requests.get(f'{self.host}/places/{place_id}/queues?personDetails=short')
        assert place_response
