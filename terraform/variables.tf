variable "environment" {
  description = "Environment name (development, staging, production)"
  type        = string
}

variable "aws_region" {
  description = "AWS region for resources"
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