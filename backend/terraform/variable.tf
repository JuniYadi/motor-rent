variable "REGION" {
  default = "ap-southeast-1"
  type    = string
}

variable "APP_NAME" {
  type = string
}

variable "APP_DOMAIN" {
  type = string
}

variable "SES_DOMAIN" {
  type = string
}

variable "STAGE" {
  default = "dev"
  type    = string
}

variable "CORS_ALLOWED_ORIGINS" {
  default = ["*"]
  type    = list(string)
}

variable "COGNITO_GROUPS" {
  default = [
    {
      name        = "admin",
      description = "Admin group",
      precedence  = 1,
    },
    {
      name        = "user",
      description = "User group",
      precedence  = 2,
    },
  ]

  type = list(object({
    name        = string
    description = string
    precedence  = number
  }))
}

variable "SSM_PARAMETES" {
  default = []

  type = list(object({
    name  = string
    value = string
  }))
}

variable "COGNITO_REGION" {
  default = "ap-southeast-1"
  type    = string
}

variable "DYNAMODB_DELETE_PROTECTION_ENABLED" {
  default = true
  type    = bool
}

variable "DYNAMODB_READ_CAPACITY" {
  default = 1
  type    = number
}

variable "DYNAMODB_WRITE_CAPACITY" {
  default = 1
  type    = number
}

variable "DYNAMODB_ENABLE_AUTOSCALING" {
  default = false
  type    = bool
}