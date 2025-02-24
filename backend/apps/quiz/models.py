from django.db import models

class QuizQuestion(models.Model):
    CATEGORY_CHOICES = [
        ('quran', 'Quran'),
        ('hadith', 'Hadith'),
        ('history', 'Islamic History'),
        ('general', 'General Knowledge')
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    question = models.TextField()
    option1 = models.CharField(max_length=255)
    option2 = models.CharField(max_length=255)
    option3 = models.CharField(max_length=255)
    option4 = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=50, choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')])
    
    def __str__(self):
        return self.question
