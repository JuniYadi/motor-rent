data "aws_ses_domain_identity" "ses" {
  provider = aws.singapore
  
  domain   = var.SES_DOMAIN
}
