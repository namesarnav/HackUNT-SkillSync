variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "mongodb_org_id" {
  description = "MongoDB Atlas organization ID"
  type        = string
}

variable "mongodb_public_key" {
  description = "MongoDB Atlas public key"
  type        = string
}

variable "mongodb_private_key" {
  description = "MongoDB Atlas private key"
  type        = string
  sensitive   = true
}

variable "mongodb_user_password" {
  description = "MongoDB user password"
  type        = string
  sensitive   = true
}

variable "alert_email" {
  description = "Email for alerts"
  type        = string
}

variable "domain_name" {
  description = "Domain name"
  type        = string
}

variable "allowed_ip_ranges" {
  description = "List of allowed IP ranges in CIDR format"
  type        = list(string)
}