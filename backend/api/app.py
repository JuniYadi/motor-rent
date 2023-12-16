from chalice import Chalice, CognitoUserPoolAuthorizer, Response
from chalicelib.db import query, store, show
from chalicelib.id import genID
from datetime import datetime
from chalicelib.cleanup import clearResponse

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