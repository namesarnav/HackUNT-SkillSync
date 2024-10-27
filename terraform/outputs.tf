output "application_url" {
  description = "URL of the deployed application"
  value       = module.environment.application_url
}

output "mongodb_connection_string" {
  description = "MongoDB connection string"
  value       = module.environment.mongodb_connection_string
  sensitive   = true
}

output "auth0_config" {
  description = "Auth0 configuration"
  value       = module.environment.auth0_config
  sensitive   = true
}