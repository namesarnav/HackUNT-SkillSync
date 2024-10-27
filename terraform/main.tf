terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 1.1.1"
    }
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 1.12.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.31.0"
    }
  }
  required_version = ">= 1.0"
}