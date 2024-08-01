from django.contrib import admin
from .models import Keybind, Leaderboard, BugReport

admin.site.register(Keybind)
admin.site.register(Leaderboard)
admin.site.register(BugReport)
