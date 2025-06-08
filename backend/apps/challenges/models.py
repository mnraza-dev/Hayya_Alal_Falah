from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Challenges(models.Model):
    CATEGORY_CHOICES = [
        ('salah', 'Salah'),
        ('quran', 'Quran'),
        ('charity', 'Charity'),
        ('fasting', 'Fasting'),
        ('dhikr', 'Dhikr'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    duration_days = models.IntegerField()  # Example: 7-day, 30-day challenges
    reward_xp = models.IntegerField(default=100)  # XP points for completing
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class UserChallenge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenges, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    progress = models.IntegerField(default=0)  # Number of days completed
    completed = models.BooleanField(default=False)

    def update_progress(self):
        """Auto-mark as completed if progress reaches duration."""
        if self.progress >= self.challenge.duration_days:
            self.completed = True
            self.save()

    def __str__(self):
        return f"{self.user.username} - {self.challenge.title}"
