def clearObject(item, **kwargs):
  hidePK = kwargs['hidePK'] if 'hidePK' in kwargs else True
  hideSK = kwargs['hideSK'] if 'hideSK' in kwargs else True
  hideLS1SK = kwargs['hideLS1SK'] if 'hideLS1SK' in kwargs else True
  hideLS2SK = kwargs['hideLS2SK'] if 'hideLS2SK' in kwargs else True
  hideLS3SK = kwargs['hideLS3SK'] if 'hideLS3SK' in kwargs else True

  if hidePK and 'pk' in item:
    del item['pk']
  if hideSK and 'sk' in item:
    del item['sk']
  if hideLS1SK and 'ls1sk' in item:
    del item['ls1sk']
  if hideLS2SK and 'ls2sk' in item:
    del item['ls2sk']
  if hideLS3SK and 'ls3sk' in item:
    del item['ls3sk']

  return item

def clearResponse(response, **kwargs):
  result = None

  # Check if response is a list or object
  if isinstance(response, list):
    result = []

    for item in response:
      clear = clearObject(item, **kwargs)
      result.append(clear)
  else:
    # Delete Object from response
    obj = clearObject(response, **kwargs)
    result = obj

  return result