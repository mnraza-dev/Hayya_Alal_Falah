from django.urls import path
from .views import get_random_question, submit_answer, leaderboard

urlpatterns = [
    path("random-question/", get_random_question, name="random_question"),
    path("submit-answer/", submit_answer, name="submit_answer"),
    path("leaderboard/", leaderboard, name="leaderboard"),
]
