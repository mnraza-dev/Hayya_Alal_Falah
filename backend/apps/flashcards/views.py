import random
from django.http import JsonResponse
from .models import Flashcard

def get_random_flashcard(request):
    """ Fetches a random flashcard from the database. """
    category = request.GET.get("category")  # Optional: Filter by category (quran, hadith, dua)

    flashcards = Flashcard.objects.all()
    if category:
        flashcards = flashcards.filter(category=category)

    if flashcards.exists():
        flashcard = random.choice(list(flashcards))
        return JsonResponse({
            "category": flashcard.get_category_display(),
            "content": flashcard.content,
            "reference": flashcard.reference,
            "explanation": flashcard.explanation
        })

    return JsonResponse({"error": "No flashcards available"}, status=404)
