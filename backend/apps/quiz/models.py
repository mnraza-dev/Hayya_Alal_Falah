from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from datetime import datetime, timedelta

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

class QuizScore(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_score = models.IntegerField(default=0)
    total_correct = models.IntegerField(default=0)
    total_attempts = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)  # 🔥 Tracks daily streak
    longest_streak = models.IntegerField(default=0)
    last_played = models.DateField(auto_now=True)  # 🔥 Stores the last quiz date

    def update_streak(self):
        """ Updates the streak based on last played date """
        today = datetime.today().date()

        if self.last_played == today:  
            return  # User has already played today, no change
        
        elif self.last_played == today - timedelta(days=1):  
            self.streak += 1  # Streak continues
        else:
            self.streak = 1  # Reset streak if missed a day

        if self.streak > self.longest_streak:
            self.longest_streak = self.streak  # Update longest streak

        self.last_played = today  # Update last played date
        self.save()