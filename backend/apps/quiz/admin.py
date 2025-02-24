from django.contrib import admin
from .models import QuizQuestion, QuizScore
# Register your models here.
@admin.register(QuizScore)
class QuizScoreAdmin(admin.ModelAdmin):
    list_display = ('longest_streak','total_score', 'user')
    search_fields = ('user', 'total_score',)

    def __str__(self):
        self.score

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'category')

    def __str__(self):
        return self.question