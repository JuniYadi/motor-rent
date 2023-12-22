import requests
import hashlib

DUITKU_URI = 'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry'
DUITKU_MERCHANT_CODE = 'DS17603'
DUITKU_API_KEY = '31b899031632af28a92abc561d9042eb'

def duitku_payment_lists():
  lists = [
    {
      "jenis": "Credit Card",
      "name": "Visa / Master Card / JCB",
      "code": "VC",
      "slug": "credit-card"
    },
    {
      "jenis": "Virtual Account",
      "name": "BCA Virtual Account",
      "code": "BC",
      "slug": "va-bca"
    },
    {
      "jenis": "Virtual Account",
      "name": "Mandiri Virtual Account",
      "code": "M2",
      "slug": "va-mandiri"
    },
    {
      "jenis": "Virtual Account",
      "name": "BNI Virtual Account",
      "code": "I1",
      "slug": "va-bni"
    },
    {
      "jenis": "Virtual Account",
      "name": "BRI Virtual Account",
      "code": "BR",
      "slug": "va-bri"
    },
    {
      "jenis": "Virtual Account",
      "name": "ATM Bersama Virtual Account",
      "code": "A1",
      "slug": "va-atm-bersama"
    }
  ]

  return lists

def duitku_payment_code(code):
  lists = duitku_payment_lists()
  result = None

  for item in lists:
    if item['code'] == code or item['slug'] == code:
      result = item
      break

  return result

def duitku_signature(**kwargs):
  return hashlib.md5((DUITKU_MERCHANT_CODE + kwargs['merchantOrderId'] + str(kwargs['paymentAmount']) + DUITKU_API_KEY).encode('utf-8')).hexdigest()

def duitku_callback_validate(sign, **kwargs):
  merchantOrderId = kwargs['merchantOrderId']
  paymentAmount = kwargs['paymentAmount']

  signature = f"{DUITKU_MERCHANT_CODE}{paymentAmount}{merchantOrderId}{DUITKU_API_KEY}"
  signatureMD5 = hashlib.md5(signature.encode('utf-8')).hexdigest()
  return signatureMD5 == sign

def duitku_create(**kwargs):
  payload = { 
    "merchantCode": DUITKU_MERCHANT_CODE,
    "paymentAmount": kwargs['payment_amount'],
    "paymentMethod": kwargs['duitku_payment_code'],
    "merchantOrderId": kwargs['order_id'],
    "productDetails": kwargs['product_details'],
    "customerVaName": kwargs['customer_name'],
    "email": kwargs['customer_email'],
    "callbackUrl": "https://api-motorent.tugas.dev/callback",
    "returnUrl": f"https://motorent.tugas.dev/app/order/{kwargs['order_id']}",
    "expiryPeriod": 120,
  }

  payload['signature'] = duitku_signature(**payload)

  response = requests.post(DUITKU_URI, json=payload)

  if response.status_code != 200:
    print(response.text)
    raise Exception('Failed to create payment')

  return response.json()