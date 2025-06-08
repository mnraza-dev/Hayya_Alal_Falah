from django.contrib import admin
from .models import QuizScore, QuizQuestion

@admin.register(QuizScore)
class QuizScoreAdmin(admin.ModelAdmin):
    list_display = ('longest_streak', 'total_score', 'user')
    search_fields = ('user__username', 'total_score')

    def __str__(self):
        return str(self.total_score)

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'category')

    def __str__(self):
        return self.question