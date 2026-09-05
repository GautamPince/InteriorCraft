from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True

def test_login_success():
    response = client.post("/api/auth/login", json={
        "email": "admin@casacraft.in",
        "password": "AdminPass2026!"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data["data"]
    assert data["data"]["user"]["email"] == "admin@casacraft.in"

def test_login_failure():
    response = client.post("/api/auth/login", json={
        "email": "admin@casacraft.in",
        "password": "WrongPassword!"
    })
    assert response.status_code == 401
