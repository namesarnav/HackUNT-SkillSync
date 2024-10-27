output "connection_string" {
  description = "MongoDB connection string"
  value       = mongodbatlas_cluster.main.connection_strings[0].standard_srv
  sensitive   = true
}

output "cluster_name" {
  description = "Name of the MongoDB cluster"
  value       = mongodbatlas_cluster.main.name
}

output "database_name" {
  description = "Name of the database"
  value       = local.database_name
}

output "database_user" {
  description = "Database user name"
  value       = mongodbatlas_database_user.app_user.username
}