import requests
import json
from constants import BASE_URL, JSON_HEADER



class TestAccountEndpoints:

    CREATED_ACCOUNT_ID = None

    TEST_ACCOUNT = {
    "username": "pytest_user",
    "password": "pytest_password",
    "email": "pytest@test.com",
    "accountTypeId": 1
    }


    def test_account_create_succes(self):
        endpoint = "/createaccount"
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(self.TEST_ACCOUNT), 
            headers=JSON_HEADER
        )
        assert response.status_code == 201
        response_data = response.json()
        account_id = response_data.get("id")
        TestAccountEndpoints.CREATED_ACCOUNT_ID = account_id
        assert TestAccountEndpoints.CREATED_ACCOUNT_ID is not None
        assert response_data["username"] == self.TEST_ACCOUNT["username"]

    def test_account_create_fail(self):
        endpoint = "/createaccount"
        # Prøver at create en bruger uden at sende et password med, som er required

        fail_account = self.TEST_ACCOUNT.copy()
        fail_account["password"] = None

        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(fail_account),headers=JSON_HEADER
            )
        
        assert response.status_code == 500


    def test_account_get_all(self):
        endpoint = "/accounts"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        assert any(account["username"] == self.TEST_ACCOUNT["username"] for account in response.json())

    def test_account_get_with_id(self):
        account_id = TestAccountEndpoints.CREATED_ACCOUNT_ID
        assert account_id is not None, "Account ID not set. Run 'test_account_create' first."
        endpoint = f"/account/{account_id}"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        assert response.json()["username"] == self.TEST_ACCOUNT["username"]

    def test_account_login_success(self):
        endpoint = "/login"
        response = requests.post(BASE_URL + endpoint, data=json.dumps(self.TEST_ACCOUNT), headers=JSON_HEADER)
        assert response.status_code == 200

    def test_account_login_fail(self):
        endpoint = "/login"
        response = requests.post(BASE_URL + endpoint, data=json.dumps({"username": "invalid", "password": "invalid"}), headers=JSON_HEADER)
        assert response.status_code == 404

    def test_account_delete(self):
        account_id = TestAccountEndpoints.CREATED_ACCOUNT_ID
        assert account_id is not None, "Account ID not set"
        endpoint = f"/deleteaccount/{account_id}"
        response = requests.delete(BASE_URL + endpoint)
        assert response.status_code == 200
        assert response.text.strip('"') == f"Brugeren med id: {account_id} er nu slettet"


        # Verify that the account is deleted
        response = requests.get(f"{BASE_URL}/account/{account_id}") 
        assert response.status_code == 404 # Unauthorized