REGION   = "ap-southeast-1"
APP_NAME = "motorent-tugas-dev"

## Dev
APP_DOMAIN           = "motorent.tugas.dev"
SES_DOMAIN           = "tugas.dev"
STAGE                = "prod"

DYNAMODB_READ_CAPACITY      = 1
DYNAMODB_WRITE_CAPACITY     = 1
DYNAMODB_ENABLE_AUTOSCALING = false
DYNAMODB_DELETE_PROTECTION_ENABLED = true

COGNITO_GROUPS = [
  {
    name        = "administrator",
    description = "Administrator Access Permission Group",
    precedence  = 1,
  },
  {
    name        = "user",
    description = "User Access Permission Group",
    precedence  = 20,
  },
]