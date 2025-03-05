import random
import json
import time
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now
from datetime import datetime

from .models import QuizQuestion, QuizScore, UserBadge

User = get_user_model()

def get_random_question(request):
    """ Fetches a random quiz question and includes a timestamp for timing. """
    category = request.GET.get('category', None)
    difficulty = request.GET.get('difficulty', None)

    questions = QuizQuestion.objects.all()

    if category:
        questions = questions.filter(category=category)
    if difficulty:
        questions = questions.filter(difficulty=difficulty)

    if questions.exists():
        question = random.choice(list(questions))
        return JsonResponse({
            "id": question.id,
            "question": question.question,
            "options": [question.option1, question.option2, question.option3, question.option4],
            "difficulty": question.difficulty,
            "category": question.category,
            "timestamp": time.time()  # 🔥 Send timestamp when the question was sent
        })

    return JsonResponse({"error": "No questions available"}, status=404)


def leaderboard(request):
    """ Retrieves the top 10 players based on total score and includes fastest streak. """
    top_players = QuizScore.objects.order_by('-total_score')[:10]
    leaderboard_data = [
        {
            "username": score.user.username,
            "total_score": score.total_score,
            "total_correct": score.total_correct,
            "streak": score.streak,
            "fastest_answer_streak": score.fastest_answer_streak  # 🔥 Show fastest streak
        }
        for score in top_players
    ]
    
    return JsonResponse({"leaderboard": leaderboard_data})

def get_user_badges(request, user_id):
    """ Fetches badges earned by a specific user. """
    try:
        user = User.objects.get(id=user_id)
        badges = UserBadge.objects.filter(user=user).values_list('badge_name', flat=True)
        return JsonResponse({"badges": list(badges)})
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)


@csrf_exempt
def submit_answer(request):
    """ Handles answer submission, enforces 30-sec timer, and calculates bonus points. """
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("user_id")
        question_id = data.get("question_id")
        selected_answer = data.get("answer")
        timestamp = data.get("timestamp")  # 🔥 Timestamp received from frontend

        # ✅ New: Validate Timestamp
        if timestamp is None:
            return JsonResponse({"error": "Timestamp is missing. Please provide a valid timestamp."}, status=400)

        try:
            timestamp = float(timestamp)  # ✅ Ensure timestamp is a valid float number
        except ValueError:
            return JsonResponse({"error": "Invalid timestamp format."}, status=400)

        try:
            user = User.objects.get(id=user_id)
            question = QuizQuestion.objects.get(id=question_id)
        except (User.DoesNotExist, QuizQuestion.DoesNotExist):
            return JsonResponse({"error": "Invalid user or question"}, status=400)

        score, created = QuizScore.objects.get_or_create(user=user)
        score.update_streak()

        # 🔥 Calculate Time Taken
        question_received_time = datetime.fromtimestamp(timestamp)
        time_taken = (now() - question_received_time).total_seconds()

        # 🔥 If time is over 30 sec, auto-fail
        if time_taken > 30:
            score.reset_fast_streak()
            score.save()
            return JsonResponse({
                "correct": False,
                "message": "Time's up! ❌ You must answer within 30 seconds!",
                "score": score.total_score,
                "streak": score.streak,
                "fastest_answer_streak": score.fastest_answer_streak
            })

        # Check if answer is correct
        bonus_points = 0
        if selected_answer == question.correct_answer:
            score.total_score += 10
            score.total_correct += 1

            # 🔥 Bonus Points for Fast Answers
            if time_taken <= 10:
                bonus_points += 5  # 🎁 +5 Points if answered in 10 sec
                score.fastest_answer_streak += 1
            else:
                score.reset_fast_streak()

            score.total_score += bonus_points
            message = f"Correct! 🎉 You answered in {int(time_taken)} sec! Bonus: {bonus_points} 🎁"
        else:
            score.reset_fast_streak()
            message = "Wrong answer. Try again!"

        score.total_attempts += 1
        score.save()

        return JsonResponse({
            "correct": selected_answer == question.correct_answer,
            "message": message,
            "score": score.total_score,
            "streak": score.streak,
            "fastest_answer_streak": score.fastest_answer_streak,
            "bonus_points": bonus_points
        })

    return JsonResponse({"error": "Invalid request"}, status=400)
