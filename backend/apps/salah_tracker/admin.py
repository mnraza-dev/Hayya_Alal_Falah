from django.contrib import admin
from .models import SalahRecord

@admin.register(SalahRecord)	
class SalahTrackerAdmin(admin.ModelAdmin):
    list_display = ('prayer_name', 'date', 'status')

    def fajr(self):
        return self.prayer_name