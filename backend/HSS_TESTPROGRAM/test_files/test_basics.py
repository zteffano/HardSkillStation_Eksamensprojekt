import requests
import json
from constants import BASE_URL, JSON_HEADER


class TestSwaggerUI:
    def test_webapi_is_online(self):
        response = requests.get(f"{BASE_URL}/swagger/index.html")
        assert "<title>Swagger UI</title>" in response.text