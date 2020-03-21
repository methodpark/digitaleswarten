import pytest
import requests

class TestQueueIntegration:
    host = 'http://backend:5000'

    @pytest.fixture
    def queue_id(self):
        return requests.post(f'{self.host}/queue')


    def test_create_queue(self, queue_id):
        returned_queue_id = queue_id
        assert '1' == returned_queue_id.content.decode('utf-8')

    def test_create_slot(self, queue_id):
        assert '1' == requests.post(f'{self.host}/slot/{queue_id}').content.decode('utf-8')
