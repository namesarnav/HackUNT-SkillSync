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

  backend "s3" {
    bucket         = "skillsync-terraform-state-prod"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "skillsync-terraform-locks-prod"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = "production"
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

  environment           = "production"
  mongodb_org_id       = var.mongodb_org_id
  mongodb_user_password = var.mongodb_user_password
  aws_region           = var.aws_region
  alert_email          = var.alert_email
  allowed_ip_ranges    = var.allowed_ip_ranges
}

module "aws_resources" {
  source = "../../modules/aws"

  environment = "production"
  domain_name = var.domain_name

  # Production specific settings
  enable_waf               = true
  enable_backup            = true
  cdn_price_class          = "PriceClass_200"
  vpc_cidr                 =  "10.0.0.0/16"
  availability_zones       = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

module "monitoring" {
  source = "../../modules/monitoring"

  environment = "production"
  aws_region  = var.aws_region
  alert_email = var.alert_email

  # Production specific settings
  enable_enhanced_monitoring = true
  retention_days            = 90
}

module "vpc" {
  source = "../../modules/vpc"

  environment         = "production"
  vpc_cidr           = "10.0.0.0/16"
  availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]
}