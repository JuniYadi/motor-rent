resource "aws_dynamodb_table" "ddb" {
  name           = "${var.APP_NAME}-${var.STAGE}"
  billing_mode   = "PROVISIONED"
  read_capacity  = var.DYNAMODB_READ_CAPACITY
  write_capacity = var.DYNAMODB_WRITE_CAPACITY
  hash_key       = "pk"
  range_key      = "sk"
  deletion_protection_enabled = var.DYNAMODB_DELETE_PROTECTION_ENABLED

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }

  attribute {
    name = "ls1sk"
    type = "S"
  }

  attribute {
    name = "ls2sk"
    type = "S"
  }

  attribute {
    name = "ls3sk"
    type = "S"
  }

  local_secondary_index {
    name            = "ls1Index"
    range_key       = "ls1sk"
    projection_type = "ALL"
  }

  local_secondary_index {
    name            = "ls2Index"
    range_key       = "ls2sk"
    projection_type = "ALL"
  }

  local_secondary_index {
    name            = "ls3Index"
    range_key       = "ls3sk"
    projection_type = "ALL"
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Environment = "${var.STAGE}"
  }
}

resource "aws_appautoscaling_target" "ddb_read_target" {
  # Only create if autoscaling is enabled
  count = var.DYNAMODB_ENABLE_AUTOSCALING == true ? 1 : 0

  max_capacity       = 100
  min_capacity       = var.DYNAMODB_READ_CAPACITY
  resource_id        = "table/${aws_dynamodb_table.ddb.name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "ddb_read_policy" {
  # Only create if autoscaling is enabled
  count = var.DYNAMODB_ENABLE_AUTOSCALING == true ? 1 : 0
  
  name               = "dynamodb-read-capacity-utilization-${aws_appautoscaling_target.ddb_read_target[1].resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ddb_read_target[1].resource_id
  scalable_dimension = aws_appautoscaling_target.ddb_read_target[1].scalable_dimension
  service_namespace  = aws_appautoscaling_target.ddb_read_target[1].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }
    target_value       = 75
    scale_in_cooldown  = 60
    scale_out_cooldown = 60
  }
}

resource "aws_appautoscaling_target" "ddb_write_target" {
  # Only create if autoscaling is enabled
  count = var.DYNAMODB_ENABLE_AUTOSCALING == true ? 1 : 0
  
  max_capacity       = 100
  min_capacity       = var.DYNAMODB_WRITE_CAPACITY
  resource_id        = "table/${aws_dynamodb_table.ddb.name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "ddb_write_policy" {
  # Only create if autoscaling is enabled
  count = var.DYNAMODB_ENABLE_AUTOSCALING == true ? 1 : 0
  
  name               = "dynamodb-write-capacity-utilization-${aws_appautoscaling_target.ddb_write_target[1].resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ddb_write_target[1].resource_id
  scalable_dimension = aws_appautoscaling_target.ddb_write_target[1].scalable_dimension
  service_namespace  = aws_appautoscaling_target.ddb_write_target[1].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }
    target_value       = 75
    scale_in_cooldown  = 60
    scale_out_cooldown = 60
  }
}
