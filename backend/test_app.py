import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """Test the health check endpoint to satisfy the CI/CD pipeline."""
    response = client.get('/health')
    assert response.status_code == 200
    assert b"ok" in response.data