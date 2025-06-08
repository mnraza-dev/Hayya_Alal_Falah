from django.contrib import admin
from .models import Challenges

@admin.register(Challenges)
class ChallengesAdmin(admin.ModelAdmin):
    list_display = ( 'title', 'description')
    search_fields = ('title',)

    class Meta:
        model = Challenges
        verbose_name_plural = 'Challenges'
        verbose_name = 'Challenge'
    
    def __str__(self):
        self.title  
        