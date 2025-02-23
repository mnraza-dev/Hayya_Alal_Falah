from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SalahRecordViewSet

router = DefaultRouter()
router.register(r'salah', SalahRecordViewSet)  

urlpatterns = [
    path('api/', include(router.urls)),
]
