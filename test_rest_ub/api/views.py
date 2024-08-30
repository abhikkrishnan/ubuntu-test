from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializer import Userserializer



@api_view(['GET'])
def get_user(request):
    return Response(Userserializer({"name":"AbhiKrishnan","age":24}).data )

@api_view(['POST'])
def create_user(request):
    data = request.data
    existing_user = User.objects.filter(name=data['name'], age=data['age']).first()
    if existing_user:
        return Response({'error': 'User with the same details already exists', 'id': existing_user.id}, status=status.HTTP_206_PARTIAL_CONTENT)
    serializer = Userserializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = Userserializer(users,many=True)
    return Response(serializer.data)

@api_view(['GET','PUT','DELETE'])
def user_details(request,pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = Userserializer(user)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = Userserializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)