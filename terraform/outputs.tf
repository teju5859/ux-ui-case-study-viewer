# Terraform Output Values

output "vpc_id" {
  description = "ID of the created VPC"
  value       = aws_vpc.devops_vpc.id
}

output "public_subnet_id" {
  description = "ID of the Public Subnet"
  value       = aws_subnet.public_subnet.id
}

output "security_group_id" {
  description = "ID of the Security Group"
  value       = aws_security_group.devops_sg.id
}

output "ec2_public_ip" {
  description = "Public IP address of the provisioned DevOps server"
  value       = aws_instance.devops_server.public_ip
}

output "ec2_public_dns" {
  description = "Public DNS of the provisioned DevOps server"
  value       = aws_instance.devops_server.public_dns
}

output "ssh_command" {
  description = "Command to SSH into the provisioned EC2 instance"
  value       = "ssh -i ~/.ssh/${var.key_name}.pem ubuntu@${aws_instance.devops_server.public_ip}"
}
