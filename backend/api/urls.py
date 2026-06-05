from django.urls import path
from .views import hola, login

urlpatterns = [
    path('api/hola/', hola),
    path('api/login/', login),
]