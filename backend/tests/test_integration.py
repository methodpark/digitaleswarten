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

    @pytest.fixture
    def entry_id(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntry'})
        return entry_response.json()['id']

    @pytest.fixture
    def entry_name(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryName'})
        return entry_response.json()['name']

    @pytest.fixture
    def entry_ticket(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryTicket'})
        return entry_response.json()['ticketNumber']

    def test_create_place(self, place_id):
        assert place_id

    def test_create_queue(self, queue_id):
        assert queue_id

    def test_get_queue_state(self, place_id, queue_id):
        requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryQueueState'})
        place_response = requests.get(f'{self.host}/places/{place_id}/queues?personDetails=full')
        assert place_response

    def test_create_entry(self, entry_id):
        assert entry_id

    def test_create_entry_name_is_correct(self, entry_name):
        assert entry_name == 'TestEntryName'

    def test_create_entry_ticket_number_is_distributed_properly(self, place_id):
        queue_response = requests.post(f'{self.host}/places/{place_id}/queues',
                                       json={'queueName': 'TestQueueTicketNumber'})
        queue_id = queue_response.json()['id']
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryTicketNumber_1'})
        entry_ticket_number = entry_response.json()['ticketNumber']
        assert entry_ticket_number == 1
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryTicketNumber_2'})
        entry_ticket_number = entry_response.json()['ticketNumber']
        assert entry_ticket_number == 2

    def test_change_entry_to_called(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryCalledState'})
        entry_id = entry_response.json()['id']
        entry_response = requests.put(f'{self.host}/places/{place_id}/queues/{queue_id}/entries/{entry_id}',
                                       json={'state': 'called'})
        assert entry_response.json()['state'] == 'called'

    def test_change_entry_to_waiting(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryWaitingState'})
        entry_id = entry_response.json()['id']
        entry_response = requests.put(f'{self.host}/places/{place_id}/queues/{queue_id}/entries/{entry_id}',
                                       json={'state': 'waiting'})
        assert entry_response.json()['state'] == 'waiting'

    def test_create_place_json_incorrect_field__return400(self):
        place_response = requests.post(f'{self.host}/places', json={'incorrectJSONField': 'aa'})
        assert place_response.status_code == 400

    def test_create_place_json_incorrect_type__return400(self):
        place_response = requests.post(f'{self.host}/places', json={'placeName': 3})
        assert place_response.status_code == 400

    def test_create_queue_json_incorrect_field__return400(self, place_id):
        queue_response = requests.post(f'{self.host}/places/{place_id}/queues',
                                       json={'incorrectJSONField': 'TestQueue'})
        assert queue_response.status_code == 400

    def test_create_queue_json_incorrect_type__return400(self, place_id):
        queue_response = requests.post(f'{self.host}/places/{place_id}/queues',
                                       json={'queueName': 3})
        assert queue_response.status_code == 400

    def test_create_entry_json_incorrect_field__return400(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'incorrectJSONField': 'TestEntry'})
        assert entry_response.status_code == 400

    def test_create_entry_json_incorrect_type__return400(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 3})
        assert entry_response.status_code == 400

    def test_get_entry_state_json_incorrect_field__return400(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryStateJsonValidation_1'})
        entry_id = entry_response.json()['id']
        entry_response = requests.put(f'{self.host}/places/{place_id}/queues/{queue_id}/entries/{entry_id}',
                                     json={'status': 'waiting'})
        assert entry_response.status_code == 400

    def test_get_entry_state_json_incorrect_type__return400(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryStateJsonValidation_2'})
        entry_id = entry_response.json()['id']
        entry_response = requests.put(f'{self.host}/places/{place_id}/queues/{queue_id}/entries/{entry_id}',
                                     json={'state': 1})
        assert entry_response.status_code == 400

    def test_get_waiting_state_of_entry(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryQueryWaitingState'})
        entry_id = entry_response.json()['id']
        entry_response = requests.get(f'{self.host}/places/{place_id}/queues/{queue_id}/entries/{entry_id}?state')
        assert entry_response.json()['state'] == 'waiting'

    def test_public_id_from_private_creation(self):
        place_response = requests.post(f'{self.host}/places', json={'placeName': 'TestPublicPraxis'})
        place_id = place_response.json()['id']
        public_place_id = place_response.json()['publicId']
        queue_response = requests.post(f'{self.host}/places/{place_id}/queues',
                                       json={'queueName': 'TestQueue'})
        queue_id = queue_response.json()['id']
        public_place_response = requests.get(f'{self.host}/places/{public_place_id}/queues?personDetails=short')
        assert public_place_response.json()[0]['id'] == queue_id
        private_place_response = requests.get(f'{self.host}/places/{place_id}/queues?personDetails=full')
        assert private_place_response.json()[0]['id'] == queue_id


    def test_get_called_state_entry(self, place_id, queue_id):
        entry_response = requests.post(f'{self.host}/places/{place_id}/queues/{queue_id}/entries',
                                        json={'name': 'TestEntryQueryCalledState'})
        entry_id = entry_response.json()['id']
        entry_response = requests.put(f'{self.host}/places/{place_id}/queues/{queue_id}/entries/{entry_id}',
                                       json={'state': 'called'})
        entry_response = requests.get(f'{self.host}/places/{place_id}/queues/{queue_id}/entries/{entry_id}?state')
        assert entry_response.json()['state'] == 'called'

    def test_query_queue_state(self, place_id):
        place_response = requests.get(f'{self.host}/places/{place_id}')

        assert place_id == place_response.json()['id']

    def test_public_id_from_private_creation(self):
        place_response = requests.post(f'{self.host}/places', json={'placeName': 'TestPublicPraxis'})
        place_id = place_response.json()['id']
        public_place_id = place_response.json()['publicId']
        queue_response = requests.post(f'{self.host}/places/{place_id}/queues',
                                       json={'queueName': 'TestQueue'})
        queue_id = queue_response.json()['id']
        public_place_response = requests.get(f'{self.host}/places/{public_place_id}/queues?personDetails=short')
        assert public_place_response.json()[0]['id'] == queue_id
        private_place_response = requests.get(f'{self.host}/places/{place_id}/queues?personDetails=full')
        assert private_place_response.json()[0]['id'] == queue_id
        assert place_response.json()['publicId']
 

    def test_place_name_storage(self):
        place_response = requests.post(f'{self.host}/places', json={'placeName': 'TestPraxisStorageMethod'})
        place_id = place_response.json()['id']
        place_name_storage_method = place_response.json()['nameStorage']
        assert True == place_name_storage_method
        place_response = requests.get(f'{self.host}/places/{place_id}')
        place_name_storage_method = place_response.json()['nameStorage']
        assert place_id == place_response.json()['id']
        assert True == place_name_storage_method
        place_response = requests.put(f'{self.host}/places/{place_id}', json={'nameStorage': False})
        assert place_id == place_response.json()['id']
        place_name_storage_method = place_response.json()['nameStorage']
        assert False == place_name_storage_method
        place_name_storage_method = place_response.json()['nameStorage']
        assert place_id == place_response.json()['id']
        assert False == place_name_storage_method

