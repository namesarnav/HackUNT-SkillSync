terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.31.0"
    }
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 1.12.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = "development"
      Project     = "SkillSync"
      ManagedBy   = "Terraform"
    }
  }
}

provider "mongodbatlas" {
  public_key  = var.mongodb_public_key
  private_key = var.mongodb_private_key
}

module "mongodb" {
  source = "../../modules/mongodb"

  environment           = "development"
  mongodb_org_id       = var.mongodb_org_id
  mongodb_user_password = var.mongodb_user_password
  aws_region           = var.aws_region
  alert_email          = var.alert_email
  
  # Development specific settings
  allowed_ip_ranges    = ["0.0.0.0/0"]  # Allow all IPs in development
}

module "aws_resources" {
  source = "../../modules/aws"

  environment = "development"
  domain_name = "dev.${var.domain_name}"
}

module "monitoring" {
  source = "../../modules/monitoring"

  environment = "development"
  aws_region  = var.aws_region
  alert_email = var.alert_email
}
