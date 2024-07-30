from django.db import models

class Keybind(models.Model):
    bind = models.CharField(max_length=255)

class Leaderboard(models.Model):
    name = models.CharField(max_length=100)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)