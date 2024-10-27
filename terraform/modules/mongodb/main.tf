terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "~> 1.12.0"
    }
  }
}

# Create MongoDB Project
resource "mongodbatlas_project" "skillsync" {
  name   = "skillsync-${var.environment}"
  org_id = var.mongodb_org_id

  is_collect_database_specifics_statistics_enabled = true
  is_realtime_performance_panel_enabled           = var.environment == "production"
  is_performance_advisor_enabled                  = var.environment == "production"
  is_schema_advisor_enabled                       = var.environment == "production"
}

# Create MongoDB Cluster
resource "mongodbatlas_cluster" "main" {
  project_id = mongodbatlas_project.skillsync.id
  name       = "skillsync-${var.environment}-cluster"

  provider_name               = "TENANT"
  backing_provider_name       = "AWS"
  provider_region_name        = var.aws_region
  
  provider_instance_size_name = var.environment == "production" ? "M10" : "M0"

  mongo_db_major_version = "6.0"

  dynamic "backup_enabled" {
    for_each = var.environment == "production" ? [1] : []
    content {
      cloud_backup             = true
      point_in_time_recovery_enabled = true
      pit_retention_period     = 7
    }
  }

  # Auto-scaling settings for production
  dynamic "auto_scaling_disk_gb_enabled" {
    for_each = var.environment == "production" ? [1] : []
    content {
      disk_gb_enabled = true
    }
  }

  # Advanced configuration
  advanced_configuration {
    javascript_enabled                   = true
    minimum_enabled_tls_protocol        = "TLS1_2"
    no_table_scan                       = false
    oplog_size_mb                       = var.environment == "production" ? 2048 : null
    sample_size_bi_connector           = 1000
    sample_refresh_interval_bi_connector = 300
  }

  # Bi connector config
  bi_connector_config {
    enabled         = var.environment == "production"
    read_preference = "secondary"
  }
}

# Create Database User
resource "mongodbatlas_database_user" "app_user" {
  username           = local.db_user
  password          = var.mongodb_user_password
  project_id        = mongodbatlas_project.skillsync.id
  auth_database_name = "admin"

  # Scoped access to specific database
  roles {
    role_name     = "readWrite"
    database_name = local.database_name
  }

  roles {
    role_name     = "readAnyDatabase"
    database_name = "admin"
  }

  # IP access list
  scopes {
    name = mongodbatlas_cluster.main.name
    type = "CLUSTER"
  }

  labels {
    key   = "environment"
    value = var.environment
  }
}

# Create IP Access List
resource "mongodbatlas_project_ip_access_list" "access_list" {
  project_id = mongodbatlas_project.skillsync.id
  
  dynamic "cidr_block" {
    for_each = var.allowed_ip_ranges
    content {
      cidr_block = cidr_block.value
      comment    = "Allowed IP range for ${var.environment}"
    }
  }
}

# Create Atlas Search Index for Users
resource "mongodbatlas_search_index" "users_search" {
  project_id    = mongodbatlas_project.skillsync.id
  cluster_name  = mongodbatlas_cluster.main.name
  database      = local.database_name
  collection_name = "users"
  name          = "users_search_index"
  analyzer      = "lucene.standard"
  mappings_dynamic = true
  search_analyzer = "lucene.standard"
}

# Create Atlas Search Index for Skills
resource "mongodbatlas_search_index" "skills_search" {
  project_id    = mongodbatlas_project.skillsync.id
  cluster_name  = mongodbatlas_cluster.main.name
  database      = local.database_name
  collection_name = "skills"
  name          = "skills_search_index"

  analyzer      = "lucene.standard"
  mappings_dynamic = true
  
  search_analyzer = "lucene.standard"
}

# Create Alert Settings
resource "mongodbatlas_alert_configuration" "high_connections" {
  project_id = mongodbatlas_project.skillsync.id
  event_type = "OUTSIDE_METRIC_THRESHOLD"

  metric_threshold_config {
    metric_name = "CONNECTIONS"
    operator    = "GREATER_THAN"
    threshold   = 5000
    units       = "RAW"
    mode       = "AVERAGE"
  }

  notification {
    type_name     = "EMAIL"
    email_enabled = true
    delay_min     = 0
    email_address = var.alert_email
  }
}

resource "mongodbatlas_alert_configuration" "high_cpu" {
  project_id = mongodbatlas_project.skillsync.id
  event_type = "OUTSIDE_METRIC_THRESHOLD"

  metric_threshold_config {
    metric_name = "MAX_CPU_UTILIZATION"
    operator    = "GREATER_THAN"
    threshold   = 80.0
    units       = "RAW"
    mode       = "AVERAGE"
  }

  notification {
    type_name     = "EMAIL"
    email_enabled = true
    delay_min     = 0
    email_address = var.alert_email
  }
}