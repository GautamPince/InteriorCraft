from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_projects():
    response = client.get("/api/projects?limit=5")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "items" in data["data"]
    assert len(data["data"]["items"]) > 0

def test_get_project_by_slug():
    response = client.get("/api/projects/modern-ahmedabad-apartment")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["slug"] == "modern-ahmedabad-apartment"
    assert data["data"]["city"] == "Ahmedabad"

def test_get_services():
    response = client.get("/api/services")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]) == 9
