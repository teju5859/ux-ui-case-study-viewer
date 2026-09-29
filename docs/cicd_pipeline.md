# CI/CD Automated Pipeline Documentation

This document describes the continuous integration and continuous deployment (CI/CD) workflow configured in the `Jenkinsfile` for the **UX/UI Case Study Viewer**.

---

## 🔄 End-to-End Pipeline Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Developer
    participant GitHub as GitHub Repo
    participant Jenkins as Jenkins Server
    participant DockerHub as Docker Hub Registry
    participant K8s as Kubernetes Cluster
    actor User as End User

    Developer->>GitHub: Git Push to `main` Branch
    GitHub-->>Jenkins: Trigger Webhook Notification
    activate Jenkins
    Jenkins->>GitHub: Stage 1: Checkout Source Code
    Jenkins->>Jenkins: Stage 2: Code Quality & Static Linting
    Jenkins->>Jenkins: Stage 3: Docker Build (Tag with ${BUILD_NUMBER})
    Jenkins->>Jenkins: Stage 4: Container Security & Smoke Test
    Jenkins->>DockerHub: Stage 5: Docker Login & Push Image
    Jenkins->>K8s: Stage 6: Apply K8s Manifests (kubectl apply)
    K8s->>K8s: Rolling Update Pods (Zero Downtime)
    Jenkins->>Jenkins: Stage 7: Post-Deployment Verification
    deactivate Jenkins
    User->>K8s: Access Live Web App via Ingress / NodePort
```

---

## 🛠️ Jenkins Pipeline Stages Breakdown

| Stage # | Stage Name | Description & Key Commands |
| :--- | :--- | :--- |
| **1** | **Checkout Source Code** | Clones the latest commit from the GitHub repository (`checkout scm`). |
| **2** | **Lint & Code Quality** | Verifies existence and structural integrity of `index.html`, `styles.css`, and `app.js`. |
| **3** | **Docker Build** | Builds an optimized container image tagged with `devopsuser/ux-ui-case-study-viewer:${BUILD_NUMBER}` and `:latest`. |
| **4** | **Security & Smoke Test** | Instantiates a temporary container locally on port 8085, executes `curl` health check to verify HTTP `200 OK`, then tears down container. |
| **5** | **Push to Docker Hub** | Authenticates securely with Docker Hub using Jenkins credentials ID `docker-hub-credentials` and pushes tagged images. |
| **6** | **Deploy to Kubernetes** | Uses Jenkins credentials ID `k8s-kubeconfig` to execute `kubectl apply` for Namespace, ConfigMap, Deployment, Service, and Ingress. Executes `kubectl rollout status`. |
| **7** | **Post-Deployment & Cleanup**| Cleans up workspace workspace artifacts (`cleanWs()`) and outputs success notification. |

---

## 🔐 Credentials & Security Management

> [!IMPORTANT]
> **Zero Hardcoded Secrets**: Secrets such as Docker Hub passwords or Kubernetes kubeconfig files are **never** committed into source code or the `Jenkinsfile`.

1. **Docker Hub Credentials**: Stored in Jenkins Credentials Store under ID `docker-hub-credentials` as a *Username with Password* pair.
2. **Kubernetes Credentials**: Stored in Jenkins Credentials Store under ID `k8s-kubeconfig` as a *Secret File*.
