# Viva Voce Q&A, PPT Presentation Structure & Project Report

This document contains **25+ beginner-friendly Viva Questions with clear simple answers**, a complete **10-slide PowerPoint (PPT) structure**, and the **Final Project Report** draft for your CSE Mini-Project presentation.

---

## ❓ 25+ Viva Voce Questions & Answers (Cloud & DevOps)

### General DevOps & Architecture
1. **Q: What is DevOps, and why is it used in this project?**
   - **A**: DevOps is a cultural and technical approach combining Software Development (Dev) and IT Operations (Ops). In this project, it automates testing, container building, and deployment whenever code changes on GitHub.
2. **Q: What is the main objective of the UX/UI Case Study Viewer project?**
   - **A**: To deliver an interactive digital design showcase web application to production using a fully automated zero-downtime CI/CD pipeline.
3. **Q: Explain the end-to-end pipeline flow of your project.**
   - **A**: Developer pushes code to **GitHub** ➔ **Jenkins** triggers build & test ➔ **Docker** packages image ➔ Image pushed to **Docker Hub** ➔ **Terraform** provisions AWS EC2/VPC ➔ **Ansible** configures server ➔ **Kubernetes** deploys pods behind an **Ingress** controller.

### Docker & Containerization
4. **Q: What is Docker, and how does it differ from a Virtual Machine (VM)?**
   - **A**: Docker virtualizes at the OS level (containers share the host kernel), making it lightweight (<50MB) and fast to boot, whereas VMs virtualize hardware and require a full OS per VM.
5. **Q: Why did you use Nginx inside the Dockerfile?**
   - **A**: Nginx is an ultra-fast, high-performance web server ideal for serving static HTML/CSS/JS frontend assets with built-in caching and gzip compression.
6. **Q: What is the purpose of `.dockerignore`?**
   - **A**: It prevents temporary or sensitive local files (like `.git`, terraform state, or documentation) from being copied into the Docker build context, keeping images small and secure.
7. **Q: What does `EXPOSE 80` do in a Dockerfile?**
   - **A**: It acts as documentation informing Docker that the container listens on network port 80 at runtime.

### Infrastructure as Code (Terraform)
8. **Q: What is Infrastructure as Code (IaC)?**
   - **A**: IaC allows developers to define, provision, and manage cloud infrastructure using human-readable declarative configuration files instead of manual console clicking.
9. **Q: What are the primary files in your Terraform folder?**
   - **A**: `providers.tf` (AWS provider config), `main.tf` (VPC, Security Group, EC2 resources), `variables.tf` (input variables), `outputs.tf` (IP address & DNS outputs), and `terraform.tfvars`.
10. **Q: What command creates cloud resources in Terraform?**
    - **A**: `terraform apply` (after `terraform init` and `terraform plan`).
11. **Q: What is `terraform destroy` used for?**
    - **A**: It tears down and deletes all provisioned AWS cloud resources to prevent unexpected charges.

### Configuration Management (Ansible)
12. **Q: What is Ansible, and how does it communicate with remote servers?**
    - **A**: Ansible is an agentless configuration management tool that uses SSH to execute automation playbooks on target servers.
13. **Q: What is an Ansible Playbook and Inventory?**
    - **A**: The Inventory lists remote target IP addresses, while the Playbook (`playbook.yml`) defines tasks (installing Docker, kubectl, configuring firewall rules).

### Kubernetes (Orchestration & Deployment)
14. **Q: What is Kubernetes (K8s)?**
    - **A**: Kubernetes is an open-source container orchestration system that automates container deployment, scaling, load balancing, and self-healing.
15. **Q: What is a Kubernetes Pod?**
    - **A**: A Pod is the smallest deployable execution unit in Kubernetes, containing one or more containers sharing net/storage namespaces.
16. **Q: Why did you set `replicas: 3` in `deployment.yaml`?**
    - **A**: To ensure high availability (HA). If one pod crashes, traffic is automatically routed to the remaining active pods.
17. **Q: What is Self-Healing in Kubernetes?**
    - **A**: K8s continuously monitors container health via Liveness Probes. If a container fails or freezes, K8s automatically restarts or replaces it.
18. **Q: What is a Rolling Update?**
    - **A**: A deployment strategy that replaces old pod versions with new ones incrementally without taking the application offline (zero downtime).
19. **Q: What is the difference between Liveness Probe and Readiness Probe?**
    - **A**: Liveness Probe determines if a pod is healthy (restarts it if failing); Readiness Probe determines if a pod is ready to accept user network traffic.
20. **Q: What is a Kubernetes ConfigMap?**
    - **A**: An object used to store non-confidential environment configuration data separately from application container code.

### Ingress & Networking
21. **Q: What is Kubernetes Ingress?**
    - **A**: An API object that manages external HTTP/HTTPS access to services within a cluster, offering host/path-based routing.
22. **Q: What is NodePort in Kubernetes Service?**
    - **A**: A service type that opens a specific high-range port (e.g., 30080) on every cluster node IP to expose internal pod services externally.

### Jenkins & CI/CD Security
23. **Q: What is a `Jenkinsfile`?**
    - **A**: A text file containing the declarative definition of a Jenkins CI/CD Pipeline stored directly in source control.
24. **Q: How do you prevent hardcoding secrets in Jenkins?**
    - **A**: By using the Jenkins Credentials Store and pulling credentials dynamically into pipeline stages via `withCredentials()`.
25. **Q: How does GitHub trigger Jenkins automatically?**
    - **A**: Via GitHub Webhooks sending an HTTP POST event payload to Jenkins whenever a developer pushes a new git commit.

---

## 📊 10-Slide PPT Presentation Structure

```text
SLIDE 1: Title Slide
- Title: UX/UI Case Study Viewer – Complete DevOps Deployment
- Subtitle: Automated CI/CD Pipeline from GitHub to Kubernetes
- Presenter Name: [Your Name] | Department: B.E. Computer Science & Engineering (3rd Year)

SLIDE 2: Problem Statement & Objectives
- Challenges in manual application deployment (downtime, human error, slow releases).
- Objective: Build a modern glassmorphic UX/UI Case Study Viewer and deploy it via a zero-downtime, continuous DevOps pipeline.

SLIDE 3: System & Pipeline Architecture
- High-level diagram showing GitHub ➔ Jenkins ➔ Docker ➔ Terraform ➔ Ansible ➔ Kubernetes ➔ Ingress.
- Key highlights: 3 Replicas, Rolling Updates, AWS Cloud Hosting.

SLIDE 4: Frontend Web Application
- UX/UI Case Study Viewer built with HTML5, CSS3 (Glassmorphism), JavaScript ES6.
- Interactive features: Category filters, Case study detail modals, live Figma prototype viewer placeholders.

SLIDE 5: Containerization with Docker
- Multi-stage optimized Nginx Alpine Dockerfile.
- Gzip compression, client-side static caching, `.dockerignore` context minimization.

SLIDE 6: Infrastructure as Code (Terraform)
- Provisioning AWS VPC (10.0.0.0/16), Security Groups, Public Subnet, and EC2 DevOps server automatically.
- Repeatable, version-controlled cloud infrastructure.

SLIDE 7: Configuration Management (Ansible)
- Modular Ansible roles (`docker`, `k8s_prep`, `app_config`).
- Automated installation of Docker Engine, kubectl, and Minikube dependencies.

SLIDE 8: Kubernetes Orchestration & Self-Healing
- Manifest breakdown: `namespace.yaml`, `configmap.yaml`, `deployment.yaml`, `service.yaml`, `ingress.yaml`.
- 3 Replicas, Liveness/Readiness probes, CPU/Memory resource constraints.

SLIDE 9: Jenkins CI/CD Pipeline Demo
- 7-Stage Declarative Pipeline execution results.
- Automated GitHub webhook trigger, Docker Hub push, zero-downtime rolling update verification.

SLIDE 10: Conclusion & Future Enhancements
- Project achievements: Fully automated delivery flow with zero manual server configuration.
- Future work: Integration of Prometheus & Grafana monitoring, Helm charts, and HTTPS SSL certificates via Cert-Manager.
```

---

## 📄 Final Project Report Content Template

**PROJECT TITLE**: UX/UI Case Study Viewer – Complete DevOps Deployment  
**ACADEMIC YEAR**: 2025 - 2026 | **DEPARTMENT**: Computer Science & Engineering  

### Abstract
This project presents an automated continuous integration and continuous deployment (CI/CD) ecosystem for hosting a digital product design showcase application titled "UX/UI Case Study Viewer". The frontend interface incorporates glassmorphic UI elements and responsive design to display interactive Figma prototypes. The backend DevOps pipeline integrates GitHub for source control, Jenkins for pipeline execution, Docker for containerization, Terraform for AWS cloud infrastructure provisioning, Ansible for automated server configuration, and Kubernetes for container orchestration with rolling updates and self-healing capabilities.

### Conclusion
The project successfully demonstrates an enterprise-grade automated deployment pipeline delivering zero-downtime releases, scalable Kubernetes cluster management, and repeatable infrastructure provisioning.
