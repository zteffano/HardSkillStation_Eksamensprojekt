import requests
import json
from constants import BASE_URL, JSON_HEADER


#TODO: Mangler at implemenere test for det nye participated endpoint

class TestAccountWorkshopEndpoints:

    TEST_ACCOUNT_WORKSHOP = {
        "accountId": 50,
        "workshopId": 1
    }

    def test_create_account_workshop_success(self):
        endpoint = "/createaccountworkshop"
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(self.TEST_ACCOUNT_WORKSHOP), 
            headers=JSON_HEADER
        )
        assert response.status_code == 201

        
    
    def test_get_all_account_workshops(self):

        
        endpoint = "/accountworkshops"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        response_data = response.json()
        #print(json.dumps(response_data, indent=2))
        assert any(account_workshop["accountId"] == self.TEST_ACCOUNT_WORKSHOP["accountId"] for account_workshop in response_data)
        assert any(account_workshop["workshopId"] == self.TEST_ACCOUNT_WORKSHOP["workshopId"] for account_workshop in response_data)
      

    def test_get_account_workshop_with_id(self):
        endpoint = f"/accountworkshop/{self.TEST_ACCOUNT_WORKSHOP['accountId']}/{self.TEST_ACCOUNT_WORKSHOP['workshopId']}"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        account_workshop_data = response.json()
        assert account_workshop_data["accountId"] == self.TEST_ACCOUNT_WORKSHOP["accountId"]
        assert account_workshop_data["workshopId"] == self.TEST_ACCOUNT_WORKSHOP["workshopId"]


    def test_delete_account_workshop(self):

        ## Virker, når vores container på AWS er opdateret til nyeste version , men pt er den ikke det
        endpoint = f"/deleteaccountworkshop/{self.TEST_ACCOUNT_WORKSHOP['accountId']}/{self.TEST_ACCOUNT_WORKSHOP['workshopId']}"
        response = requests.delete(BASE_URL + endpoint)
        assert response.status_code == 204  # No Content

        # Verify that the account workshop is deleted
        check_endpoint = f"/accountworkshop/{self.TEST_ACCOUNT_WORKSHOP['accountId']}/{self.TEST_ACCOUNT_WORKSHOP['workshopId']}"
        response = requests.get(BASE_URL + check_endpoint)
        assert response.status_code == 404 # Not found
