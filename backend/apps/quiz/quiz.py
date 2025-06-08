from django.urls import path
from .views import get_random_question

urlpatterns = [
    path("random-question/", get_random_question, name="random_question"),
]
