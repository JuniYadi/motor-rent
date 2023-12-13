output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.user_pool.id
}

output "cognito_user_pool_web_id" {
  value = aws_cognito_user_pool_client.website.id
}
