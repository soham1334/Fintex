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

class Chatbot(APIView):
    
    def post(self, request):
        print("QUERY POST REQUEST RECEIVED")
        
        # Ensure session exists or create one
        if not request.session.session_key:
            request.session.create()
        session_id = request.session.session_key
        
        response = request.data.get('query')
        print(f"User query: {response}, session_id: {session_id}")
        
        # Pass session_id to Query for per-session memory isolation
        ans = Query(response, session_id=session_id)
        
        print(f"Agent answer: {ans}")
        return Response({"RESPONSE": ans})

