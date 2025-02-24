import random
from django.http import JsonResponse
from .models import QuizQuestion

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
            "question": question.question,
            "options": [question.option1, question.option2, question.option3, question.option4],
            "difficulty": question.difficulty,
            "category": question.category
        })
    
    return JsonResponse({"error": "No questions available"}, status=404)
