from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChallengeViewSet

router = DefaultRouter()
router.register(r'challenges', ChallengeViewSet) 

urlpatterns = [
    path('', include(router.urls)),  
]
