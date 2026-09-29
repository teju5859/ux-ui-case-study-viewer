# UX/UI Case Study Viewer – Complete DevOps Deployment

An interactive digital product showcase landing page for UX/UI Case Studies built with **HTML, CSS, JavaScript**, and fully automated with an end-to-end DevOps continuous integration and deployment (CI/CD) pipeline.

---

## 🚀 Project Overview

The **UX/UI Case Study Viewer** allows product designers and engineers to showcase research, wireframes, and live interactive Figma prototypes. The application is packaged into a high-performance Docker container and continuously deployed to a self-healing Kubernetes cluster provisioned via Terraform and configured with Ansible.

```text
Developer Push ➔ GitHub ➔ Jenkins CI/CD ➔ Docker Build ➔ Docker Hub ➔ Terraform Infrastructure ➔ Ansible Config ➔ Kubernetes Cluster (3 Replicas) ➔ Ingress ➔ Live Application
```

---

## 📁 Repository Directory Structure

```text
ux_ui_case_study_viewer/
├── frontend/                     # Interactive Web Application
│   ├── index.html                # Showcase landing page & modals
│   ├── styles.css                # Glassmorphic CSS design system
│   └── app.js                    # Modal switcher & category filtering logic
├── Dockerfile                    # Nginx Alpine container definition
├── nginx.conf                    # Nginx custom server block & caching rules
├── .dockerignore                 # Build context exclusion rules
├── Jenkinsfile                   # Declarative CI/CD Pipeline (7 Stages)
├── terraform/                    # Infrastructure as Code (AWS VPC, EC2, SG)
│   ├── providers.tf
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── terraform.tfvars.example
├── ansible/                      # Server Configuration Management
│   ├── inventory
│   ├── playbook.yml
│   └── roles/
│       ├── docker/tasks/main.yml
│       ├── k8s_prep/tasks/main.yml
│       └── app_config/tasks/main.yml
├── k8s/                          # Kubernetes Manifests
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── docs/                         # Documentation & Viva Preparation
│   ├── architecture.md           # Architecture diagrams & explanations
│   ├── cicd_pipeline.md          # CI/CD flow diagrams & stage details
│   ├── setup_guide.md            # Step-by-step setup (Tanglish + English)
│   ├── viva_and_ppt.md           # 25+ Viva Q&A, PPT structure & report draft
│   └── troubleshooting_and_costs.md # Troubleshooting & AWS destroy guide
└── README.md                     # Main documentation & Git strategy
```

---

## 🌿 Git Branching Strategy & Workflow

This project follows the **GitFlow** branching strategy designed for team collaboration and continuous deployment:

- `main`: Production-ready code. Triggers automated production deployment pipelines.
- `develop`: Integration branch for new features. Tested in staging environments.
- `feature/*`: Feature-specific branches created from `develop` for individual tasks.

### Step-by-Step Git Commands for Developers

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ux-ui-case-study-viewer.git
cd ux-ui-case-study-viewer

# 2. Create and switch to develop branch
git checkout -b develop

# 3. Create a new feature branch for UI enhancements
git checkout -b feature/interactive-modal

# 4. Stage and commit changes
git add .
git commit -m "feat: Add interactive Figma prototype modal viewer"

# 5. Push feature branch to GitHub
git push origin feature/interactive-modal

# 6. Merge feature branch into develop after review
git checkout develop
git merge feature/interactive-modal

# 7. Release to main for production deployment
git checkout main
git merge develop
git tag -a v1.0.0 -m "Release Version 1.0.0 - Production Ready"
git push origin main --tags
```

---

## ⚙️ Quick Start (Local Run via Docker)

To run the application locally without full cloud infrastructure:

```bash
# Build the Docker image
docker build -t uxui-case-study-viewer:local .

# Run container on port 8080
docker run -d -p 8080:80 --name uxui-app uxui-case-study-viewer:local

# Access in browser
# Open: http://localhost:8080
```

---

## 📚 Complete Guides & Documentation

- [Detailed Setup Guide (Tanglish + English)](docs/setup_guide.md)
- [System Architecture & Diagrams](docs/architecture.md)
- [CI/CD Pipeline Explanation](docs/cicd_pipeline.md)
- [25+ Viva Q&A & PPT Structure](docs/viva_and_ppt.md)
- [Troubleshooting & AWS Cost Guide](docs/troubleshooting_and_costs.md)
