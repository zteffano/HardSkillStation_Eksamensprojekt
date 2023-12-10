import requests
import json
from constants import BASE_URL, JSON_HEADER

class TestWorkshopEndpoints:
    CREATED_WORKSHOP_ID = None

    TEST_WORKSHOP = {
        "name": "test_workshop",
        "created": "2023-12-06T13:16:09.193Z",
        "start": "2023-12-06T13:16:09.193Z",
        "end": "2023-12-06T13:16:09.193Z",
        "description": "test_",
        "summary": "test_",
        "logo": "string",
        "microCredentials": 0,
        "ticketLink": "string",
        "workshopLink": "string",
        "status": "Fint",
        "categoryId": 1,
        "locationId": 1,
        "companyId": 1
    }

    def test_workshop_create_success(self):
        endpoint = "/createworkshop"
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(self.TEST_WORKSHOP), 
            headers=JSON_HEADER
        )
        assert response.status_code == 201
        response_data = response.json()
        # id er ikke en del af vores test_workshop, så vi skal lave et workaround og hente fra headeren i stedet
        #workshop_id = response_data.get("id")
        workshop_id = response.headers.get("Location").replace("/workshop/", "")
        TestWorkshopEndpoints.CREATED_WORKSHOP_ID = workshop_id
        assert TestWorkshopEndpoints.CREATED_WORKSHOP_ID is not None

    def test_workshop_create_fail(self):
        endpoint = "/createworkshop"

        # Prøver at create en workshop uden at sende et navn med, som er required
        fail_workshop = self.TEST_WORKSHOP.copy()
        fail_workshop["name"] = None
        
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(fail_workshop),headers=JSON_HEADER
            )
        
        assert response.status_code == 500

    def test_workshop_get_all(self):
        endpoint = "/workshops"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200

    def test_workshop_get_with_id(self):
        workshop_id = TestWorkshopEndpoints.CREATED_WORKSHOP_ID
        assert workshop_id is not None, "Workshop ID not set. Run 'test_workshop_create' first."
        endpoint = f"/workshop/{workshop_id}"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        workshop_data = response.json()
        assert workshop_data["name"] == self.TEST_WORKSHOP["name"]

    def test_workshop_delete(self):
        workshop_id = TestWorkshopEndpoints.CREATED_WORKSHOP_ID
        assert workshop_id is not None, "Workshop ID not set"
        endpoint = f"/deleteworkshop/{workshop_id}"
        response = requests.delete(BASE_URL + endpoint)
        assert response.status_code == 200
        # Adjust the expected response text as per your API's format
        assert response.text.strip('"') == f"Workshop med id: {workshop_id} er nu slettet"

        # Verify that the workshop is deleted
        response = requests.get(f"{BASE_URL}/workshop/{workshop_id}") 
        assert response.status_code == 404 # Not found
