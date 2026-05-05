# Log Monitoring Dashboard (Flask + React + MongoDB)

A containerized, real-time log monitoring dashboard designed for a complete DevOps pipeline deployment.

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Python Flask
- **Database:** MongoDB
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Cloud Hosting:** AWS EC2 (t2.medium)
- **IaC:** Terraform

## Project Structure
```text
Devops_Project/
├── backend/
│   ├── app.py 
│   ├── requirements.txt 
│   └── Dockerfile
├── frontend/
│   ├── package.json 
│   ├── vite.config.js 
│   └── src/ 
├── terraform/
│   └── main.tf
├── .github/workflows/
│   └── main.yml
├── docker-compose.yml
└── README.md
