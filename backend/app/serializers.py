from rest_framework import serializers
from .models import Keybind, Leaderboard, BugReport

class KeybindSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keybind
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = '__all__'

class BugReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = BugReport
        fields = "__all__"