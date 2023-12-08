import requests
import json
from constants import BASE_URL, JSON_HEADER

class TestCompanyEndpoints:
    CREATED_COMPANY_ID = None

    TEST_COMPANY = {
        "name": "test_company",
        "location": {
            "name": "test_location_name",
            "address": "test_location_address",
            "website": "test_location_website",
            "contactEmail": "test_location_email"
        }
    }

    def test_company_create_success(self):
        endpoint = "/createcompany"
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(self.TEST_COMPANY), 
            headers=JSON_HEADER
        )
        assert response.status_code == 201
        response_data = response.json()
        company_id = response_data.get("id")
        TestCompanyEndpoints.CREATED_COMPANY_ID = company_id
        assert TestCompanyEndpoints.CREATED_COMPANY_ID is not None
        assert response_data["name"] == self.TEST_COMPANY["name"]

    def test_company_create_fail(self):
        endpoint = "/createcompany"
        # Prøver at create company uden at angive location

        fail_company = self.TEST_COMPANY.copy()
        fail_company["location"] = None

        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(fail_company),headers=JSON_HEADER
            )
        
        assert response.status_code == 500

    def test_company_get_all(self):
        endpoint = "/companies"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        assert any(company["name"] == self.TEST_COMPANY["name"] for company in response.json())

    def test_company_get_with_id(self):
        company_id = TestCompanyEndpoints.CREATED_COMPANY_ID
        assert company_id is not None, "Company ID not set. Run 'test_company_create' first."
        endpoint = f"/company/{company_id}"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        assert response.json()["name"] == self.TEST_COMPANY["name"]

    def test_company_delete(self):
        #til at kunne teste om den bliver i databasen
        #import pytest
        #pytest.skip()
        company_id = TestCompanyEndpoints.CREATED_COMPANY_ID
        assert company_id is not None, "Company ID not set"
        endpoint = f"/deletecompany/{company_id}"
        response = requests.delete(BASE_URL + endpoint)
        assert response.status_code == 200
        # Adjust the expected response text as per your API's format
        assert response.text.strip('"') == f"Company med id: {company_id} er nu slettet"

        # Verify that the company is deleted
        response = requests.get(f"{BASE_URL}/company/{company_id}") 
        assert response.status_code == 404 # Not found
