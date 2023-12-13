from chalice import Chalice, CognitoUserPoolAuthorizer, Response
from chalicelib.db import query, store, show
from chalicelib.id import genID
from datetime import datetime
import time
import json

app = Chalice(app_name='api')

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

@app.route('/motors', methods=['GET'], cors=True)
def motors_index():
    code = 200
    message = 'success'
    result = []

    data = query('CATEGORY_MOTORS')

    if data:
        for item in data:
            skData = item['name'].lower()
            getTypeMotor = query('TYPE_MOTORS', skType='ls1sk', skValue=skData)
            
            if getTypeMotor:

                item['type_motors'] = getTypeMotor
                result.append(item)
    else:
        code = 404
        message = 'Note not found'
        
    return Response(body={
        'code': code,
        'message': message,
        'data': result
    }, status_code=code, headers=contentTypes['object'])

@app.route('/motors/{type_motor}', methods=['GET'], cors=True)
def motors_shows(type_motor):
    code = 200
    message = 'success'

    data = query('TYPE_MOTORS', skType='sk', skValue=str(type_motor))

    if data == False:
        code = 404
        message = 'Data not found'
        data = None
        
    return Response(body={
        'code': code,
        'message': message,
        'data': data
    }, status_code=code, headers=contentTypes['object'])