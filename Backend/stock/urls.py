from django.urls import path,include
from .views import *


urlpatterns = [
    path('yfinance/index/',GetNifty.as_view()),
    path('yfinance/Performance/',Performance.as_view()),
    path('yfinance/Chatbot/',Chatbot.as_view()),
]