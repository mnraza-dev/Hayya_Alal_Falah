from django.db import models
from django.conf import settings

class SalahRecord(models.Model):
    PRAYER_NAMES = [
        ('Fajr', 'Fajr'),
        ('Dhuhr', 'Dhuhr'),
        ('Asr', 'Asr'),
        ('Maghrib', 'Maghrib'),
        ('Isha', 'Isha'),
    ]

    STATUS_CHOICES = [
        ('missed', 'Missed'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    prayer_name = models.CharField(max_length=10, choices=PRAYER_NAMES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='missed')
    date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.prayer_name} on {self.date} ({self.status})"
