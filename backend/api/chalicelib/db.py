import boto3
from boto3.dynamodb.conditions import Key, Attr
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

ddb = boto3.resource('dynamodb')
table = ddb.Table('motorent-tugas-dev-prod')

def query(pk, **kwargs):
    try:
      skType = kwargs['skType'] if 'skType' in kwargs else None
      skValue = kwargs['skValue'] if 'skValue' in kwargs else None
      query = None
      count = kwargs['count'] if 'count' in kwargs else False

      if skType is None and skValue is None:
        query = table.query(
          KeyConditionExpression=Key('pk').eq(pk),
          Select='COUNT' if count else 'ALL_ATTRIBUTES'
        )
      elif skType is not None and skValue is not None and skType == 'sk':
        query = table.query(
          KeyConditionExpression=Key('pk').eq(pk) & Key(skType).begins_with(skValue),
          Select='COUNT' if count else 'ALL_ATTRIBUTES'
        )

      elif skType is not None and skValue is not None and skType != 'sk':
        indexName = None

        if skType == 'ls1sk':
          indexName = 'ls1Index'
        elif skType == 'ls2sk':
          indexName = 'ls2Index'
        elif skType == 'ls3sk':
          indexName = 'ls3Index'

        query = table.query(
          KeyConditionExpression=Key('pk').eq(pk) & Key(skType).begins_with(skValue),
          IndexName=indexName,
          Select='COUNT' if count else 'ALL_ATTRIBUTES'
        )

      if count:
        return query['Count']
      else:
        return query['Items']
    
    except Exception as e:
      print(f"Error Querying Data: {e}")
      return False

def store(data):
    try:  
      table.put_item(Item=data, ConditionExpression='attribute_not_exists(sk)')
      return True
    except Exception as e:
      print(f"Error Storing Data: {e}")
      return False

def show(data):
    query = table.get_item(Key=data)

    if 'Item' not in query:
        return False

    # Delete Object from response
    del query['Item']['pk']
    del query['Item']['sk']
    del query['Item']['ls1sk']
    del query['Item']['ls2sk']
    del query['Item']['ls3sk']

    return query['Item']

def update(**kwargs):
  pk = kwargs['pk'] if 'pk' in kwargs else None
  sk = kwargs['sk'] if 'sk' in kwargs else None

  if pk is None or sk is None:
    return False
  
  try:
    table.update_item(
      Key={
        'pk': pk,
        'sk': sk
      },
      UpdateExpression=kwargs['UpdateExpression'],
      ExpressionAttributeNames=kwargs['ExpressionAttributeNames'],
      ExpressionAttributeValues=kwargs['ExpressionAttributeValues'],
      ReturnValues="UPDATED_NEW"
    )
    
    return True
  except Exception as e:
    print(f"Error Updating Data: {e}")
    return False

def delete(data):
    try:
      table.delete_item(Key=data)
      return True
    except Exception as e:
      print(f"Error Deleting Data: {e}")
      return False