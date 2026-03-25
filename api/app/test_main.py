import pytest
from fastapi.testclient import TestClient
from main import app



# Create a test client
client = TestClient(app)


# listing test
def test_listings_basic():
    response = client.get("/listings")
    assert response.status_code == 200

    json_data = response.json()
    assert json_data["error_code"] == 0
    
    
# listing with params test
def test_listings_param():
    response = client.get("/listings?search=awsome&min=1000&max=100000")
    assert response.status_code == 200

    json_data = response.json()
    assert json_data["error_code"] == 0
    

# listing detail test
def test_listings_detail_success():
    response = client.get("/listings?1")
    assert response.status_code == 200

    json_data = response.json()
    assert json_data["error_code"] == 0

    
#listing detail test (invalid id)
def test_listings_detail_out():
    response = client.get("/listings/100")
    assert response.status_code == 200

    json_data = response.json()
    assert json_data["error_code"] == 1
    
    