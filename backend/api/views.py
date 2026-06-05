from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Usuario

@api_view(['GET'])
def hola(request):
    return Response({'mensaje': 'Hola React!'})

@api_view(['POST'])
def login(request):
    dni = request.data.get('dni')
    password = request.data.get('password')

    try:
        usuario = Usuario.objects.get(dni=dni, password=password)
        return Response({
            'ok': True,
            'nombre': usuario.nombre,
            'rol': usuario.rol,
        })
    except Usuario.DoesNotExist:
        return Response({'ok': False, 'error': 'Credenciales incorrectas'}, status=401)