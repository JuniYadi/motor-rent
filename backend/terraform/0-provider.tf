terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2.1"
    }
  }

  backend "s3" {
  }
}

provider "aws" {
  region  = "ap-southeast-3"
}

provider "aws" {
  region  = "ap-southeast-1"
  alias   = "singapore"
}