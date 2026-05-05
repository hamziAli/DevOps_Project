# Log Monitoring Dashboard (Flask + React + MongoDB)

A containerized, real-time log monitoring dashboard designed for a complete DevOps pipeline deployment. This project serves as a practical implementation of modern CI/CD practices and infrastructure as code.

## 🚀 Overview
The Log Monitoring Dashboard provides a centralized interface to view system logs in real-time. The application utilizes a microservices-style architecture, with a Python Flask backend, a React frontend, and a MongoDB database, all orchestrated via Docker Compose.

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Python Flask
- **Database:** MongoDB
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions (Automated Testing & Deployment)
- **Cloud Hosting:** AWS EC2 (t2.medium)
- **IaC:** Terraform

## 📂 Project Structure
```text
Devops_Project/
├── backend/            # Python Flask API & Logic
│   ├── app.py 
│   ├── requirements.txt 
│   └── Dockerfile
├── frontend/           # React SPA (Vite)
│   ├── package.json 
│   ├── vite.config.js 
│   └── src/ 
├── terraform/          # Infrastructure as Code
│   └── main.tf
├── .github/workflows/  # CI/CD Pipeline Configuration
│   └── main.yml
├── docker-compose.yml  # Multi-container orchestration
└── README.md
