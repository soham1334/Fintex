from django.shortcuts import render
from Newssmry.Smry import news_summary
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import json
from django.core.cache import cache




@api_view(['POST'])
def summary(request):
    print(request.data.get('url'))
    if request.method == 'POST':
        url = request.data.get('url')
        print("POST Request received") 
        cache_key = f"summary_url:{url}"
        smry = cache.get(cache_key)

        if url:
            print("URL Recieved")
            if smry:
                print("Sending Summary")
                return Response({"summary":smry}, status=status.HTTP_200_OK)
            else:
                try:
                    print("Generating Summary....")
                    smry = news_summary(url)
                 
                    cache.set(cache_key,smry,timeout=7200)
                    print("summary Generated")
                    return Response({"summary":smry}, status=status.HTTP_200_OK) 
                except Exception as e:
                    return Response({"message": f"Error generating summary: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)       
        else:
            return Response({"message": "No URL found in request"}, status=400)
    return Response({"message":"something went wrong"})
   



  
