from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .yfinance import *
from .chatbot import Query


class GetNifty(APIView):

    def get (self,request):
        #print("Request Received")
        response = [] 
        cur,prev = getnifty("^BSESN")
        response.append({'cur':cur ,'prev':prev,'diff':cur-prev})

        cur,prev = getnifty("^NSEI")
        response.append({'cur':cur ,'prev':prev,'diff':cur-prev})
       
        cur,prev = getnifty("^NSEBANK")
        response.append({'cur':cur ,'prev':prev,'diff':cur-prev})

        #print("function call completed")
        return Response(response)

    def post(self,request):
        #print(request.data)
        response = Company_info(request.data.get('company'))
        print(response)
        return Response(response)
    
class Performance (APIView):
    #print("Performance request received") 
    def post(self,request):
        response = Company_Performance(request.data.get('company'))
        print("PERFORMANCE:",response)
        return Response(response)    

class Chatbot (APIView):
    
    def post(self,request):
        print("QUERY POST REQUEST RECEIVED")
        response = request.data.get('query')
        print(response)
        ans = Query(response)
        print(ans)
        return Response({"RESPONSE":ans})     

