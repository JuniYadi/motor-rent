resource "aws_cognito_user_pool" "user_pool" {
  provider = aws.singapore

  name     = "${var.APP_NAME}-${var.STAGE}"

  username_configuration {
    case_sensitive = false
  }
  
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = false
    require_uppercase                = true
    temporary_password_validity_days = 3
  }

  device_configuration {
    challenge_required_on_new_device      = true
    device_only_remembered_on_user_prompt = false
  }

  admin_create_user_config {
    # Allow Self Sign Up
    allow_admin_create_user_only = false
    invite_message_template {
      sms_message   = "Hi {username}, your temporary password is {####}. ${var.APP_NAME}"
      email_subject = "Your Account at ${var.APP_DOMAIN}"
      email_message = <<EOF
Hi, Please Login to the app using the following link: https://${var.APP_DOMAIN}<br/>
<br />
Use the following details to login:<br />
Email: {username}<br />
Password: {####}<br />
<br />
Notes:<br />
1. Password is case sensitive<br />
2. This invite will active in 3 Days.<br />
<br />
Thanks,<br />
Best Regards,<br />
${var.APP_DOMAIN}
EOF
    }
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "Your Verification Code at ${var.APP_DOMAIN}"
    email_message        = "Your confirmation code is {####}"
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  email_configuration {
    source_arn             = data.aws_ses_domain_identity.ses.arn
    email_sending_account  = "DEVELOPER"
    from_email_address     = "Authentication <noreply@${var.APP_DOMAIN}>"
    reply_to_email_address = "support@${var.APP_DOMAIN}"
  }
}

resource "aws_cognito_user_pool_client" "website" {
  provider = aws.singapore
  
  name                          = "website"
  user_pool_id                  = aws_cognito_user_pool.user_pool.id
  generate_secret               = false
  prevent_user_existence_errors = "ENABLED"

  access_token_validity  = 1
  id_token_validity      = 1
  refresh_token_validity = 14
  token_validity_units {
    access_token  = "days"
    id_token      = "days"
    refresh_token = "days"
  }

  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]
}

resource "aws_cognito_user_group" "groups" {
  provider = aws.singapore

  for_each = { for group in var.COGNITO_GROUPS : group.name => group }

  name         = each.value.name
  user_pool_id = aws_cognito_user_pool.user_pool.id
  description  = each.value.description
  precedence   = each.value.precedence
}
