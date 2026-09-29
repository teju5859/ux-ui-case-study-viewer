# Troubleshooting Guide & AWS Cost Management

This guide helps you troubleshoot common deployment issues and manage AWS cloud costs safely.

---

## 🛠️ Common Errors & Troubleshooting Checklist

### 1. Docker Build or Permission Denied Errors
- **Symptom**: `Permission denied while trying to connect to the Docker daemon socket`.
- **Fix**: Add your user or Jenkins user to the docker group:
  ```bash
  sudo usermod -aG docker ubuntu
  sudo usermod -aG docker jenkins
  sudo systemctl restart docker
  ```

### 2. Kubernetes Pods Stuck in `ImagePullBackOff` or `ErrImagePull`
- **Symptom**: `kubectl get pods` shows `ImagePullBackOff`.
- **Fix**: Check if the Docker Hub repository name in `k8s/deployment.yaml` matches your pushed image tag:
  ```bash
  kubectl describe pod <pod-name> -n uxui-viewer-prod
  # Verify image tag exists on Docker Hub
  ```

### 3. Jenkins Pipeline Fails at Docker Push Stage
- **Symptom**: `unauthorized: authentication required` during `docker push`.
- **Fix**: Ensure Jenkins credential ID `docker-hub-credentials` is correctly configured in Jenkins Credentials Manager with valid Docker Hub username & password.

### 4. Terraform `Error: Duplicate Security Group` or `VPC Limit Exceeded`
- **Symptom**: Terraform fails to create security group or VPC.
- **Fix**: Ensure previous resources are cleaned up or change the VPC CIDR block in `variables.tf`:
  ```bash
  cd terraform/
  terraform destroy -auto-approve
  terraform apply -auto-approve
  ```

### 5. NodePort 30080 Not Accessible in Browser
- **Symptom**: Browser times out when visiting `http://<EC2_IP>:30080`.
- **Fix**: Verify AWS Security Group rules allow port 30080:
  ```bash
  aws ec2 authorize-security-group-ingress --group-name uxui-viewer-sg --protocol tcp --port 30080 --cidr 0.0.0.0/0
  ```

---

## 💰 AWS Cost Management & Free-Tier Optimization

> [!WARNING]
> Running AWS resources continuously will consume AWS credits. Follow these best practices to keep costs at zero or near-zero!

### Free-Tier Eligible Services Used
1. **EC2 Instance**: `t3.medium` (750 free hours/month for t2.micro / t3.micro in AWS Free Tier).
2. **EBS Storage**: 30 GB gp3 storage (Included in Free Tier).
3. **VPC & Internet Gateway**: Completely FREE of charge.

---

## 🗑️ 100% Complete Infrastructure Cleanup (`terraform destroy`)

When you are done presenting or testing your mini-project, follow these steps to destroy all AWS resources immediately:

```bash
# Step 1: Open terminal and navigate to terraform directory
cd ux_ui_case_study_viewer/terraform/

# Step 2: Run Terraform Destroy command
terraform destroy -auto-approve

# Step 3: Verify output confirmation
# Terminal will print: "Destroy complete! Resources: 7 destroyed."
```

By executing `terraform destroy`, all EC2 instances, security groups, subnets, internet gateways, and route tables are completely deleted from AWS, ensuring **0 unexpected charges** on your credit card!
