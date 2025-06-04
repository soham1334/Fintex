from django.urls import path
from RegisterApi import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView



urlpatterns = [
    path("Register/",views.Registerview.as_view(),name = "Registerview"),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected-view/',views.Protectedview.as_view(),name = "protectedview")
   
]