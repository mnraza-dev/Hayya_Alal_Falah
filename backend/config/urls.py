from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.urls')),
    path('salah_tracker/', include('apps.salah_tracker.urls')),
    path('api/', include('apps.challenges.urls')),
    path("api/", include("apps.hijri_calendar.urls")),
    path("api/quiz/", include("apps.quiz.urls")),
    path("api/flashcards/", include("apps.flashcards.urls")),
]
