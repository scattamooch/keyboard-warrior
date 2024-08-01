from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KeybindViewSet, LeaderboardViewSet, BugReportViewSet

router = DefaultRouter()
router.register(r'keybinds', KeybindViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'bugreport', BugReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
]