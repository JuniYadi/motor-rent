from chalice import Chalice, CognitoUserPoolAuthorizer, Response
from chalicelib.db import query, store, show, update
from chalicelib.id import id
from chalicelib.duitku import duitku_create, duitku_payment_code, duitku_singature_validate
from datetime import datetime
from chalicelib.cleanup import clearResponse
from urllib.parse import parse_qs

app = Chalice(app_name='motorent-api')

authorizer = CognitoUserPoolAuthorizer(
    'motorent-tugas-dev-prod',
    provider_arns=['arn:aws:cognito-idp:ap-southeast-1:057675665881:userpool/ap-southeast-1_6iYSyiq9D']
)

contentTypes = {
    "array": ['application/json'],
    "object": {'Content-Type': 'application/json'},
    "str": 'application/json',
}

@app.route('/')
def index():
    return {'message': 'success'}

@app.route('/locations', methods=['GET'], cors=True)
def location_detail():
    code = 200
    message = 'success'

    data = query('LOKASI_PENJEMPUTAN')

    if data == False:
        code = 404
        message = 'Data not found'
        data = None
        
    return Response(body={
        'code': code,
        'message': message,
        'data': clearResponse(data)
    }, status_code=code, headers=contentTypes['object'])


@app.route('/callback', methods=['GET', 'POST'], cors=True, content_types=["application/x-www-form-urlencoded"])
def location_detail():
    try:
        current_request = app.current_request
        body = parse_qs(app.current_request.raw_body.decode())

        merchantOrderId = body.get("merchantOrderId", None)
        reference = body.get("reference", None)
        paymentCode = body.get("paymentCode", None)
        signature = body.get("signature", None)
        amount = body.get("amount", None)
        publisherOrderId = body.get("publisherOrderId", None)
        settlementDate = body.get("settlementDate", None)

        validateSignature = duitku_singature_validate(signature, merchantOrderId=merchantOrderId, paymentAmount=amount)

        if validateSignature == False:
            raise Exception('Signature not valid')
        
        getData = show({"pk": "ORDERS", "sk": merchantOrderId})

        if getData == False:
            raise Exception('OrderID not found')
            
        status = "LUNAS"
        userId = getData['userId']
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

        update(pk='ORDERS', sk=merchantOrderId,
                UpdateExpression="SET #status = :status, #ls2sk = :ls2sk, #ls3sk = :ls3sk, #updatedAt = :updatedAt",
                ExpressionAttributeNames={
                    "#status": "status", "#ls2sk": "ls2sk", "#ls3sk": "ls3sk", "#updatedAt": "updatedAt"
                },
                ExpressionAttributeValues={
                    ":status": status,
                    ":ls2sk": f"{userId}#{status}",
                    ":ls3sk": f"{status}#{now}",
                    ":updatedAt": now
                    }
                )
        
        store({
            "pk": "PAYMENTS",
            "sk": reference,
            "ls1sk": f"{merchantOrderId}",
            "ls2sk": f"{userId}#{merchantOrderId}",
            "ls3sk": f"{status}#{now}",
            "userId": userId,
            "orderId": merchantOrderId,
            "reference": reference,
            "paymentCode": paymentCode,
            "publisherOrderId": publisherOrderId,
            "amount": amount,
            "status": status,
            "settlementDate": settlementDate,
            "createdAt": now,
            "updatedAt": now
        })

        return Response(body={
            'code': 200,
            'message': 'success',
        }, status_code=200)
    except Exception as e:
        return Response(body={
            'code': 500,
            'message': str(e),
            'data': None,
        }, status_code=500)    


@app.route('/motors', methods=['GET'], cors=True)
def motors_index():
    code = 200
    message = 'success'
    result = []
    params = app.current_request.query_params

    if params and params.get('type_motor'):
        typeMotor = params.get('type_motor', None)
        data = query('TYPE_MOTORS', skType='ls1sk', skValue=str(typeMotor.lower()))
        
        if data:
            for item in data:
                skData = item['sk']
                getTypeMotor = query('LISTS_MOTORS', skType='sk', skValue=skData, count=True)
                
                if getTypeMotor:
                    item['stocks'] = getTypeMotor
                    result.append(item)

    else:
        data = query('CATEGORY_MOTORS')

        if data:
            for item in data:
                skData = item['name'].lower()
                getTypeMotor = query('TYPE_MOTORS', skType='ls1sk', skValue=skData)
                
                if getTypeMotor:
                    item['type_motors'] = getTypeMotor
                    result.append(item)

    if data == False:
        code = 404
        message = 'Data not found'
        data = None
        
    return Response(body={
        'code': code,
        'message': message,
        'data': clearResponse(result)
    }, status_code=code, headers=contentTypes['object'])

@app.route('/motors/{type_motor}', methods=['GET'], cors=True)
def motors_shows(type_motor):
    code = 200
    message = 'success'
    skData = str(type_motor)

    getTypeMotor = query('LISTS_MOTORS', skType='sk', skValue=skData, count=True)

    if getTypeMotor:
        data = show({"pk": "TYPE_MOTORS", "sk": skData})
    else:
        code = 404
        message = 'No Stock Available'
        data = None

    if data == False:
        code = 404
        message = 'Data not found'
        data = None
        
    return Response(body={
        'code': code,
        'message': message,
        'data': clearResponse(data)
    }, status_code=code, headers=contentTypes['object'])

@app.route('/orders', methods=['GET'], cors=True, authorizer=authorizer)
def order_index():
    code = 200

    try:
        context = app.current_request.context['authorizer']['claims']
        userId = context['sub']

        data = query('ORDERS', skType='ls1sk', skValue=str(userId))

        if data == False:
            code = 404
            raise Exception('Data not found')
            
        return Response(body={
            'code': code,
            'message': 'success',
            'data': clearResponse(data)
        }, status_code=code, headers=contentTypes['object'])
    
    except Exception as e:
        return Response(body={
            'code': code,
            'message': str(e),
            'data': None,
        }, status_code=code, headers=contentTypes['object'])

@app.route('/orders/{id}', methods=['GET'], cors=True, authorizer=authorizer)
def order_detail(id):
    code = 200

    try:
        context = app.current_request.context['authorizer']['claims']
        userId = context['sub']

        data = show({ "pk": "ORDERS", "sk": id })

        if data == False:
            code = 404
            raise Exception('Data not found')
        
        if 'userId' not in data or data['userId'] != userId:
            code = 403
            raise Exception('Forbidden')
            
        return Response(body={
            'code': code,
            'message': 'success',
            'data': clearResponse(data)
        }, status_code=code, headers=contentTypes['object'])
    
    except Exception as e:
        print(e)

        return Response(body={
            'code': code,
            'message': str(e),
            'data': None,
        }, status_code=code, headers=contentTypes['object'])

@app.route('/orders', methods=['POST'], cors=True, authorizer=authorizer, content_types=contentTypes['array'])
def order_create():
    try:
        result = None

        context = app.current_request.context['authorizer']['claims']
        userId = context['sub']
        body = app.current_request.json_body
        validates = ['motor_id', 'motor_name', 'motor_price', 'pickup_location_id', 'pickup_location_fee', 'pickup_date', 'dropoff_location_id', 'dropoff_location_fee', 'dropoff_date', 'days', 'payment', 'name', 'email', 'phone_number', 'identity']

        if body is None:
            raise Exception('Bad Request, body is required')
        
        for validate in validates:
            if validate not in body:
                raise Exception(f'Bad Request, {validate} is required')

        # Setup Order
        genenerateID = id()
        status = "MENUNGGU_PEMBAYARAN"
        createdAt = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        updatedAt = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        
        data = body
        data['pk'] = 'ORDERS'
        data['sk'] = genenerateID
        data['ls1sk'] = f"{userId}#{genenerateID}"
        data['ls2sk'] = f"{userId}#{status}"
        data['ls3sk'] = f"{status}#{createdAt}"
        data['userId'] = userId
        data['id'] = genenerateID
        data['total'] = (int(body['days']) * int(body['motor_price'])) + int(body['pickup_location_fee']) + int(body['dropoff_location_fee'])
        data['status'] = status
        data['createdAt'] = createdAt
        data['updatedAt'] = updatedAt

        store(data)

        result = { "id": genenerateID }
        
        if body['payment'] != 'cash':
            duitkuCode = duitku_payment_code(body['payment'])
            print(duitkuCode)
            duitkuResult = duitku_create(
                duitku_payment_code=duitkuCode['code'],
                order_id=genenerateID,
                product_details=f"Order Rental Motor {body['motor_name']} Untuk ({body['days']} Hari)",
                payment_amount=data['total'],
                customer_name=body['name'],
                customer_email=body['email'],
            )
            print(duitkuResult)
            result['paymentUrl'] = duitkuResult['paymentUrl']
        
        return Response(body={
            'code': 200,
            'message': 'success',
            'data': clearResponse(result),
        }, status_code=200, headers=contentTypes['object'])

    except Exception as e:
        return Response(body={
            'code': 500,
            'message': str(e),
            'data': None,
        }, status_code=500, headers=contentTypes['object'])