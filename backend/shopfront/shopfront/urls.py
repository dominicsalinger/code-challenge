from django.urls import include, path
from rest_framework import routers
from server import views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('', include('server.urls')),
    path('get-jwt-token/', obtain_jwt_token),
]