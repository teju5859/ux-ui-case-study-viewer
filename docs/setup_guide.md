# UX/UI Case Study Viewer – Step-by-Step Setup Guide (Tanglish + English)

Hello CSE Student! 👋 Welcome to your **Complete DevOps Mini Project Setup Guide**. 
In this guide, standard technical instructions are paired with **Tanglish (Tamil + English)** explanations so you can easily understand *why* we use each tool and how the entire pipeline works end-to-end!

---

## 💡 What is this DevOps Project? (Tanglish Concept Clearer)

In simple terms:
1. **Frontend App (`HTML/CSS/JS`)**: Namma UI/UX Case Study landing page. Figma prototype modal showcase erukum.
2. **GitHub**: Namma source code control panra platform. `main`, `develop`, `feature` branches use panrom.
3. **Docker**: Website code ah Nginx web server oda serthu packaging (Containerization) panra tool. Any OS la same ah run aagum!
4. **Jenkins**: Code ah automatic ah test panni, Docker build panni, Kubernetes cloud la publish panra **CI/CD Automation Engine**.
5. **Terraform**: AWS Cloud inside VPC, Security Groups, and EC2 Server ah Automatic code moolama Create (Provision) panra **Infrastructure as Code (IaC)** tool.
6. **Ansible**: Provision panna AWS Server ullara pooi Docker and Kubernetes tools automatic ah Install panra **Configuration Management** tool.
7. **Kubernetes (K8s)**: Namma Docker containers ah 3 replicas ah run panni, Auto-healing & Rolling Updates manage panra **Container Orchestration** tool.
8. **Ingress**: External users internet moolama namma Kubernetes website access panradhuku visual URL Routing & Load Balancing kudukura Gateway.

---

## 🛠️ Prerequisites & Local Tool Installations

Run these commands on your local machine (Windows WSL2 or Ubuntu Linux):

### 1. Install Git & VS Code
```bash
sudo apt update -y
sudo apt install -y git curl unzip
```

### 2. Install Docker & Docker Desktop
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER
# Logout and log back in to apply group permissions
```

### 3. Install Terraform CLI
```bash
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform -y
```

### 4. Install Ansible
```bash
sudo apt install -y software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install -y ansible
```

### 5. Install AWS CLI & Configure Credentials
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS Key and Access Token
aws configure
# Input AWS Access Key ID, Secret Access Key, Region (e.g. us-east-1), output (json)
```

---

## 🚀 Step-by-Step Deployment Instructions

### STEP 1: GitHub Repository Setup & Push
```bash
# Initialize git repository
cd ux_ui_case_study_viewer
git init
git branch -M main

# Add remote repository (Replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ux-ui-case-study-viewer.git

# Commit and Push
git add .
git commit -m "feat: Initial commit of UX/UI Case Study Viewer with complete DevOps pipeline"
git push -u origin main
```

---

### STEP 2: Terraform Infrastructure Provisioning (AWS)
```bash
cd terraform/

# Initialize Terraform AWS provider
terraform init

# Validate syntax
terraform validate

# View execution plan
terraform plan

# Apply changes to create AWS VPC, Subnet, Security Group, and EC2 Instance
terraform apply -auto-approve

# Note down the output EC2 Public IP from terminal output!
# Example Output: ec2_public_ip = "54.210.12.34"
```

---

### STEP 3: Server Configuration using Ansible
```bash
cd ../ansible/

# Open inventory file and edit YOUR_EC2_PUBLIC_IP with actual IP from Terraform output
nano inventory

# Run Ansible Playbook to install Docker and Kubernetes dependencies on EC2
ansible-playbook -i inventory playbook.yml
```

---

### STEP 4: Local Docker Test & Push to Docker Hub
```bash
# Navigate back to root project folder
cd ..

# Build Docker container image locally
docker build -t YOUR_DOCKERHUB_USERNAME/ux-ui-case-study-viewer:v1.0 .

# Test run container on localhost port 8080
docker run -d -p 8080:80 --name test-app YOUR_DOCKERHUB_USERNAME/ux-ui-case-study-viewer:v1.0

# Open browser and test: http://localhost:8080

# Push container image to public Docker Hub registry
docker login
docker push YOUR_DOCKERHUB_USERNAME/ux-ui-case-study-viewer:v1.0
```

---

### STEP 5: Kubernetes Deployment (Minikube / k3s Cluster)
```bash
# On your DevOps server or local Minikube cluster:
minikube start --driver=docker

# Apply Kubernetes Manifests in order
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

# Check deployed pods status (3 Replicas running)
kubectl get pods -n uxui-viewer-prod

# Check service and exposed NodePort (30080)
kubectl get svc -n uxui-viewer-prod

# Access the website in browser:
# http://YOUR_EC2_PUBLIC_IP:30080
```

---

### STEP 6: Jenkins CI/CD Webhook Setup
1. Open Jenkins Web Interface: `http://YOUR_EC2_PUBLIC_IP:8080`
2. Go to **Manage Jenkins** -> **Credentials** -> **System** -> **Global credentials**.
3. Add `docker-hub-credentials` (Username & Password for Docker Hub).
4. Add `k8s-kubeconfig` (Secret File containing your cluster kubeconfig).
5. Create a new **Pipeline Job** named `uxui-case-study-viewer-pipeline`.
6. Select **Pipeline script from SCM**, choose **Git**, paste your GitHub Repository URL, and specify `Jenkinsfile`.
7. Enable **GitHub hook trigger for GITScm polling**.
8. Go to your GitHub Repository -> **Settings** -> **Webhooks** -> Add `http://YOUR_EC2_PUBLIC_IP:8080/github-webhook/`.

🎉 Now every time you push code to GitHub, Jenkins will automatically build, test, push Docker image, and update Kubernetes pods with zero downtime!
