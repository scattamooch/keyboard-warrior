from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Keybind, Leaderboard
from .serializers import KeybindSerializer, LeaderboardSerializer

class KeybindViewSet(viewsets.ModelViewSet):
    queryset = Keybind.objects.all()
    serializer_class = KeybindSerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer