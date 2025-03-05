from django.db import models

class Flashcard(models.Model):
    CATEGORY_CHOICES = [
        ('quran', 'Quran Tafsir'),
        ('hadith', 'Hadith'),
        ('dua', 'Du’a')
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    content = models.TextField()  # The main text (Ayah, Hadith, or Du’a)
    reference = models.CharField(max_length=255, blank=True, null=True)  # Quran/Hadith source
    explanation = models.TextField(blank=True, null=True)  # Tafsir or Hadith meaning

    def __str__(self):
        return f"{self.get_category_display()} - {self.reference if self.reference else 'No Reference'}"
