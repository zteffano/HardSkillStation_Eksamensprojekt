import requests
import json
from constants import BASE_URL, JSON_HEADER

class TestCategoryEndpoints:
    CREATED_CATEGORY_ID = None

    TEST_CATEGORY = {
        "name": "pytest_category"
    }

    def test_create_category_success(self):
        endpoint = "/createcategory"
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(self.TEST_CATEGORY), 
            headers=JSON_HEADER
        )
        assert response.status_code == 201
        response_data = response.json()
        category_id = response_data.get("id")
        TestCategoryEndpoints.CREATED_CATEGORY_ID = category_id
        assert TestCategoryEndpoints.CREATED_CATEGORY_ID is not None

    def test_create_category_fail(self):
        endpoint = "/createcategory"
        # Prøver at create en category uden at sende et navn med, som er required

        fail_category = self.TEST_CATEGORY.copy()
        fail_category["name"] = None
        
        response = requests.post(
            BASE_URL + endpoint, 
            data=json.dumps(fail_category),headers=JSON_HEADER
            )
        
        assert response.status_code == 500

    def test_get_all_categories(self):
        endpoint = "/categories"
        response = requests.get(BASE_URL + endpoint)
        category_data = response.json()
        found_category = False

        for category in category_data:
            if category["name"] == self.TEST_CATEGORY["name"]:
                found_category = True
                break

        assert found_category == True
        assert response.status_code == 200

    def test_get_category_with_id(self):
        category_id = TestCategoryEndpoints.CREATED_CATEGORY_ID
        assert category_id is not None, "Category ID not set. Run 'test_create_category' first."
        endpoint = f"/category/{category_id}"
        response = requests.get(BASE_URL + endpoint)
        assert response.status_code == 200
        category_data = response.json()
        assert category_data["name"] == self.TEST_CATEGORY["name"]

    def test_delete_category(self):
        category_id = TestCategoryEndpoints.CREATED_CATEGORY_ID
        assert category_id is not None, "Category ID not set"
        endpoint = f"/deletecategory/{category_id}"
        response = requests.delete(BASE_URL + endpoint)
        assert response.status_code == 200
        
        assert response.text.strip('"') == f"Category med id:{category_id} is now deleted"

        # Verify that the category is deleted
        response = requests.get(f"{BASE_URL}/category/{category_id}") 
        assert response.status_code == 404 # Not found
