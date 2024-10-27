terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
    }
    aws = {
      source  = "hashicorp/aws"
    }
    vercel = {
      source = "vercel/vercel"
    }
  }

  backend "s3" {
    bucket = "skillsync-terraform-state"
    key    = "global/s3/terraform.tfstate"
    region = "us-east-1"

    # DynamoDB table for state locking
    dynamodb_table = "skillsync-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "SkillSync"
      ManagedBy   = "Terraform"
    }
  }
}

# Include environment-specific configuration
module "environment" {
  source = "./environments/${var.environment}"

  # Pass through all necessary variables
  aws_region          = var.aws_region
  environment         = var.environment
  domain_name         = var.domain_name
  auth0_domain        = var.auth0_domain
  auth0_client_id     = var.auth0_client_id
  auth0_client_secret = var.auth0_client_secret
  mongodb_org_id      = var.mongodb_org_id
  mongodb_public_key  = var.mongodb_public_key
  mongodb_private_key = var.mongodb_private_key
}
