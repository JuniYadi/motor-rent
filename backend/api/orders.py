from chalice import Chalice, CognitoUserPoolAuthorizer, Response
from chalicelib.db import query, store, show, update
from chalicelib.id import id
from chalicelib.duitku import duitku_create, duitku_payment_code, duitku_singature_validate
from datetime import datetime
from chalicelib.cleanup import clearResponse
from urllib.parse import parse_qs

def order_index():
    code = 200

    try:
        context = app.current_request.context['authorizer']['claims']
        userId = context['sub']

        print(userId)

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