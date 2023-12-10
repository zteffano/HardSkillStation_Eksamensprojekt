import requests
import json
from constants import BASE_URL, JSON_HEADER

class TestLocationEndpoints:
    CREATED_LOCATION_ID = None

    TEST_LOCATION = {
        "name": "test_location",
        "address": "string",
        "website": "string",
        "contactEmail": "string"
    }

    def test_location_create(self):
        endpoint = "/createlocation"
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(self.TEST_LOCATION), 
            headers=JSON_HEADER
        )
        assert response.status_code == 201
        response_data = response.json()
        #Temp fix da der ikke er nogen id i response pt før update
        #location_id = response_data.get("id")
        location_id = response.headers.get("Location").replace("/location/", "")
        TestLocationEndpoints.CREATED_LOCATION_ID = location_id
        assert TestLocationEndpoints.CREATED_LOCATION_ID is not None

    def test_location_create_fail(self):
        endpoint = "/createlocation"
        # Prøver at create en location uden at sende et navn med, som er required

        fail_location = self.TEST_LOCATION.copy()
        fail_location["name"] = None

        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(fail_location),headers=JSON_HEADER
            )
        
        assert response.status_code == 500

    def test_location_get_all(self):
        endpoint = "/locations"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200

    def test_location_get_with_id(self):
        location_id = TestLocationEndpoints.CREATED_LOCATION_ID
        assert location_id is not None, "Location ID not set. Run 'test_location_create' first."
        endpoint = f"/location/{location_id}"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200

    def test_location_delete(self):
        location_id = TestLocationEndpoints.CREATED_LOCATION_ID
        assert location_id is not None, "Location ID not set"
        endpoint = f"/deletelocation/{location_id}"
        response = requests.delete(BASE_URL + endpoint)
        assert response.status_code == 200
    
        assert response.text.strip('"') == f"Location med id: {location_id} er nu slettet"

        # Verify that the location is deleted
        response = requests.get(f"{BASE_URL}/location/{location_id}") 
        assert response.status_code == 404 # Not found
