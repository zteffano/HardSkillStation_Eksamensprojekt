import requests
import json

base_url = "http://hss.zteffano.dk:1337"






### Check Swagger kører på vores server

def test_webapi_is_online():

    #ARRANGE
    response = requests.get(base_url + "/swagger/index.html")

    #ACT
    if response.status_code == 200:
        swagger_fundet = response.text.find("<title>Swagger UI</title>")
    
    #ASSERT
    assert swagger_fundet != -1


### ACCOUNT ENDPOINTS TEST ###

def test_account_create():
    
    endpoint = "/createaccount"
    headers =  {"Content-Type": "application/json"}

    data = {
        "username": "pytest_user",
        "password": "pytest_password",
        "email": "pytest@test.com",
        "accountTypeId": 1
    }

    response = requests.post(base_url+endpoint, data=json.dumps(data), headers=headers)

    assert response.status_code == 201 
    ##test_id = response.headers.get('Location')
    
def test_account_get_all():

    response = requests.get(base_url + "/accounts")

    account_data = response.json()
    found_user = False

    #ACT
    for account in account_data:
        if account["username"] == "pytest_user" and account["password"] == "pytest_password":
            found_user = True

    
    #ASSERT
    assert found_user == True        



def test_account_get_with_id():
    
    response = requests.get(base_url + "/account/1")

    account_data = response.json()

    assert response.status_code == 200

    assert account_data["username"] == "johndoe"
    


def test_account_login(): ### LOGIN
    
    endpoint = "/login"
    headers =  {"Content-Type": "application/json"}

    data = {
        "username": "MarcusBvn",
        "password": "hej1234"
    }

    response = requests.post(base_url+endpoint, data=json.dumps(data), headers=headers)
    assert response.status_code == 200

def test_account_delete_with_id():
    pass

"""
### ACCOUNT WORKSHOP ENDPOINTS:
def test_accountworkshop_create():

    endpoint = "/createaccountworkshop"
    headers =  {"Content-Type": "application/json"}

    data = {
        "accountId": "1",
        "workshopId": "2"

    }

    response = requests.post(base_url+endpoint, data=json.dumps(data), headers=headers)

    assert response.status_code == 201 


def test_accountworkshop_get_all():
    pass

def test_accountworkshop_get_with_id():
    pass

def test_accountworkshop_delete_with_id():
    pass

"""

### CATEGORY ENDPOINTS
def test_create_category():
    endpoint = "/createcategory"
    headers =  {"Content-Type": "application/json"}
    data = {
        "name": "pytest_category"
    }
    
    response = requests.post(base_url+endpoint, data=json.dumps(data), headers=headers)
    assert response.status_code == 201


def test_get_all_categories():
    response = requests.get(base_url + "/categories")
    category_data = response.json()
    found_category = False

    for category in category_data:
        if category["name"] == "pytest_category":
            found_category = True
            
    assert found_category == True       
    assert response.status_code == 200
    
    
    
def test_get_category_with_id():
    # ACT
    response = requests.get(base_url + "/category/1")
    category_data = response.json()
    # ASSERT
    assert response.status_code == 200
    assert category_data["name"] == "Programmering"

def test_delete_category_with_id():
    pass
    """"
    # ARRANGE
    create_test_category()
    # ACT
    response = requests.delete(base_url + "/deletecategory/1")

    # ASSERT
    assert response.status_code == 200
    """

### COMPANY ENDPOINTS

def test_company_create():
    endpoint = "/createcompany"
    headers =  {"Content-Type": "application/json"}

    data = {
        "name": "test_company",
        "location": {
            "name": "test_location_name",
            "address": "test_location_address",
            "website": "test_location_website",
            "contactEmail": "test_location_email"
        }
    }
    
    response = requests.post(base_url+endpoint, data=json.dumps(data), headers=headers)

    assert response.status_code == 201 
    

def test_company_get_all():
    response = requests.get(base_url + "/companies")

    company_data = response.json()
    found_company = False

    #ACT
    for company in company_data:
        if company["name"] == "Tribe Media":
            found_company = True

    
    #ASSERT
    assert found_company == True        
    


def test_company_get_with_id():
    response = requests.get(base_url + "/company/1")

    account_data = response.json()

    assert response.status_code == 200

    assert account_data["name"] == "Tribe Media"

def test_company_delete_with_id():
    pass


### LOCATION
def test_location_create():
    endpoint = "/createlocation"
    headers =  {"Content-Type": "application/json"}

    data = {
          "name": "test_location",
            "address": "string",
            "website": "string",
            "contactEmail": "string"
    }

    response = requests.post(base_url+endpoint, data=json.dumps(data), headers=headers)
    assert response.status_code == 201  

def test_location_get_all():
    response = requests.get(base_url + "/locations")
    location_data = response.json()

    assert response.status_code == 200

def test_location_get_with_id():
    location_id = 1
    response = requests.get(base_url + f"/location/{location_id}")
    location_data = response.json()

    assert response.status_code == 200


def test_location_delete_with_id():
    pass
    """
    test_location_create()
    location_id_delete = 1
    response = requests.delete(base_url + f"/deletelocation/{location_id_delete}")

    assert response.status_code == 200
    """


### WORKSHOP

def test_workshop_create():

    endpoint = "/createworkshop"
    headers =  {"Content-Type": "application/json"}

    data = {
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

    response = requests.post(base_url+endpoint, data=json.dumps(data), headers=headers)

    assert response.status_code == 201 

def test_workshop_get_all():
    response = requests.get(base_url + "/workshops")
    workshop_data = response.json()
    
    assert response.status_code == 200

def test_workshop_get_with_id():
    response = requests.get(base_url + "/workshop/1")

    account_data = response.json()

    assert response.status_code == 200

    assert account_data["name"] == "Effektiv Grøn Markedsføringsstrategi"
    

def test_workshop_delete_with_id():
    pass