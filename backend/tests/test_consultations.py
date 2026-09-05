from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_submit_consultation():
    payload = {
        "name": "Testing Client",
        "phone": "9876543210",
        "email": "testclient@example.com",
        "city": "Ahmedabad",
        "property_type": "Apartment",
        "property_size": "1800 sqft",
        "bedrooms": "3 BHK",
        "budget": "₹10–20 Lakh",
        "design_style": "Modern",
        "preferred_contact_method": "WhatsApp",
        "message": "Automated unit test consultation enquiry."
    }
    response = client.post("/api/consultations", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["message"] == "Thank you! Our design expert will contact you shortly."
    assert data["data"]["name"] == "Testing Client"
