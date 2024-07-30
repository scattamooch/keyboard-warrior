from rest_framework import serializers
from .models import Keybind, Leaderboard

class KeybindSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keybind
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = '__all__'