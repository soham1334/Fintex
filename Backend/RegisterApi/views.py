from django.shortcuts import render
from .serializers import Userserializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class Registerview(generics.CreateAPIView):
    print("Request Recieved")
    queryset = User.objects.all()
    serializer_class = Userserializer
    permission_classes = [AllowAny]
    print("Registered Successfully")

class Protectedview (APIView):
    permission_classes = [IsAuthenticated]

    def get (self,request):
        print("Request Recieved")
        response = {'status' :"Request is permitted"}
        return Response(response)
