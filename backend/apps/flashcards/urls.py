from django.urls import path
from .views import get_random_flashcard

urlpatterns = [
    path("random-flashcard/", get_random_flashcard, name="random_flashcard"),
]
