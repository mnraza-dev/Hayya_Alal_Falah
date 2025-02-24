from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.urls')),
    path('salah_tracker/', include('apps.salah_tracker.urls')),
    path('api/', include('apps.challenges.urls')),
]
