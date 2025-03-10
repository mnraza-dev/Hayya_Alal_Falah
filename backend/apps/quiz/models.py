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
    last_played = models.DateField(auto_now=True)  
    fastest_answer_streak = models.IntegerField(default=0)  
   
    def reset_fast_streak(self):
        self.fastest_answer_streak = 0
        self.save()

    def check_badges(self):
        """ Check & Unlock Badges When Achievements Are Met """
        badges = []

        if self.total_score >= 100:
            badges.append("100 Club 🎯")
        if self.total_correct >= 10:
            badges.append("Hadith Expert 📜")
        if self.total_correct >= 20:
            badges.append("Quran Master 📖")
        if self.streak >= 7:
            badges.append("Sunnah Streak 🔥")
        if self.streak >= 30 and self.total_score >= 500:
            badges.append("Legendary Learner 🏆")

        return badges

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

class UserBadge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    badge_name = models.CharField(max_length=255)
    date_earned = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.badge_name}"