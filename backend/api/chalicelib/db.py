import boto3
from boto3.dynamodb.conditions import Key, Attr
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

ddb = boto3.resource('dynamodb')
table = ddb.Table('motorent-tugas-dev-prod')

def query(pk, **kwargs):
    try:
      skType = kwargs['skType'] if 'skType' in kwargs else None
      skValue = kwargs['skValue'] if 'skValue' in kwargs else None
      query = None

      if skType is None and skValue is None:
        query = table.query(
          KeyConditionExpression=Key('pk').eq(pk)
        )
      elif skType is not None and skValue is not None and skType == 'sk':
        query = table.query(
          KeyConditionExpression=Key('pk').eq(pk) & Key(skType).begins_with(skValue)
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
          IndexName=indexName
        )
      
      # Delete Object from response
      for item in query['Items']:
        del item['pk']
        del item['sk']
        del item['ls1sk']
        del item['ls2sk']
        del item['ls3sk']

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

def delete(data):
    try:
      table.delete_item(Key=data)
      return True
    except Exception as e:
      print(f"Error Deleting Data: {e}")
      return False