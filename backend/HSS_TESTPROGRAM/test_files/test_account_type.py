import requests
import json
from constants import BASE_URL, JSON_HEADER

class TestAccountTypeEndpoints:
    CREATED_ACCOUNT_TYPE_ID = None

    TEST_ACCOUNT_TYPE = {
        "name": "test_account_type"
    }

    def test_create_account_type(self):
        endpoint = "/createaccounttype"
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(self.TEST_ACCOUNT_TYPE), 
            headers=JSON_HEADER
        )
        assert response.status_code == 201
        response_data = response.json()
        # Temp fix da der ikke er nogen id i response pt før update
        #account_type_id = response_data.get("id")
        account_type_id = response.headers.get("Location").replace("/accounttype/", "")
        TestAccountTypeEndpoints.CREATED_ACCOUNT_TYPE_ID = account_type_id
        assert TestAccountTypeEndpoints.CREATED_ACCOUNT_TYPE_ID is not None

    def test_get_all_account_types(self):
        endpoint = "/accounttypes"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        assert any(account_type["name"] == self.TEST_ACCOUNT_TYPE["name"] for account_type in response.json())

    def test_get_account_type_with_id(self):
        account_type_id = TestAccountTypeEndpoints.CREATED_ACCOUNT_TYPE_ID
        assert account_type_id is not None, "Account Type ID not set. Run 'test_create_account_type' first."
        endpoint = f"/accounttype/{account_type_id}"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        account_type_data = response.json()
        assert account_type_data["name"] == self.TEST_ACCOUNT_TYPE["name"]

    def test_delete_account_type(self):
        account_type_id = TestAccountTypeEndpoints.CREATED_ACCOUNT_TYPE_ID
        assert account_type_id is not None, "Account Type ID not set"
        endpoint = f"/deleteaccounttype/{account_type_id}"
        response = requests.delete(BASE_URL + endpoint)
        assert response.status_code == 200
        # Adjust the expected response text as per your API's format
        assert response.text.strip('"') == f"Accounttypen med {account_type_id} er nu slettet"

        # Verify that the account type is deleted
        response = requests.get(f"{BASE_URL}/accounttype/{account_type_id}") 
        assert response.status_code == 404 # Not found
