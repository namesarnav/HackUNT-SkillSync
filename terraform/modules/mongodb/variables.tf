variable "environment" {
  description = "Environment name (development, staging, production)"
  type        = string
}

variable "mongodb_org_id" {
  description = "MongoDB Atlas organization ID"
  type        = string
}

variable "mongodb_user_password" {
  description = "Password for the database user"
  type        = string
  sensitive   = true
}

variable "aws_region" {
  description = "AWS region for the MongoDB cluster"
  type        = string
  default     = "us-east-1"
}

variable "allowed_ip_ranges" {
  description = "List of allowed IP ranges in CIDR format"
  type        = list(string)
  default     = ["0.0.0.0/0"]  # Replace with specific IPs in production
}

variable "alert_email" {
  description = "Email address for MongoDB alerts"
  type        = string
}
