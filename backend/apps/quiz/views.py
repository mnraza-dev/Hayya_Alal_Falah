from django.http import JsonResponse
from django.contrib.auth import get_user_model  

from django.views.decorators.csrf import csrf_exempt
import json
import random
from .models import QuizQuestion, QuizScore

User = get_user_model()

def get_random_question(request):
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
            "category": question.category
        })
    
    return JsonResponse({"error": "No questions available"}, status=404)
def leaderboard(request):
    top_players = QuizScore.objects.order_by('-total_score')[:10]
    leaderboard_data = [
        {
            "username": score.user.username,
            "total_score": score.total_score,
            "total_correct": score.total_correct,
            "streak": score.streak,  # 🔥 Show Current Streak
            "longest_streak": score.longest_streak
        }
        for score in top_players
    ]
    
    return JsonResponse({"leaderboard": leaderboard_data})

# @csrf_exempt
# def submit_answer(request):
#     if request.method == "POST":
#         data = json.loads(request.body)

#         user_id = data.get("user_id")  # User submitting answer
#         question_id = data.get("question_id")
#         selected_answer = data.get("answer")

#         try:
#             user = User.objects.get(id=user_id) 
#             question = QuizQuestion.objects.get(id=question_id)
#         except (User.DoesNotExist, QuizQuestion.DoesNotExist):
#             return JsonResponse({"error": "Invalid user or question"}, status=400)

#         score, created = QuizScore.objects.get_or_create(user=user)

#         # Check if answer is correct
#         if selected_answer == question.correct_answer:
#             score.total_score += 10  # +10 points per correct answer
#             score.total_correct += 1
#             score.streak += 1

#             # Bonus points for streaks
#             if score.streak >= 3:
#                 score.total_score += 5  # Bonus 5 points

#             # Update longest streak
#             if score.streak > score.longest_streak:
#                 score.longest_streak = score.streak

#             response = {"correct": True, "message": "Correct! 🎉", "score": score.total_score}
#         else:
#             score.streak = 0  # Reset streak if wrong
#             response = {"correct": False, "message": "Wrong answer. Try again!", "score": score.total_score}

#         score.total_attempts += 1
#         score.save()

#         return JsonResponse(response)

#     return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def submit_answer(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("user_id")
        question_id = data.get("question_id")
        selected_answer = data.get("answer")

        try:
            user = User.objects.get(id=user_id)
            question = QuizQuestion.objects.get(id=question_id)
        except (User.DoesNotExist, QuizQuestion.DoesNotExist):
            return JsonResponse({"error": "Invalid user or question"}, status=400)

        score, created = QuizScore.objects.get_or_create(user=user)
        score.update_streak()  # 🔥 Updates the daily streak  

        # Check if answer is correct
        if selected_answer == question.correct_answer:
            score.total_score += 10  # ✅ Base +10 points
            score.total_correct += 1

            # 🔥 Bonus Points for Streaks
            if score.streak % 3 == 0:
                score.total_score += 5  # 🎁 +5 Bonus for 3-day streak
            if score.streak % 7 == 0:
                score.total_score += 10  # 🎁 +10 Bonus for 7-day streak
            if score.streak == 30:
                score.total_score += 50  # 🎉 +50 Bonus for 30-day streak

            message = f"Correct! 🎉 Your streak is {score.streak} days! Keep going!"
        else:
            message = "Wrong answer. Try again!"

        score.total_attempts += 1
        score.save()

        return JsonResponse({
            "correct": selected_answer == question.correct_answer,
            "message": message,
            "score": score.total_score,
            "streak": score.streak,
            "longest_streak": score.longest_streak
        })

    return JsonResponse({"error": "Invalid request"}, status=400)