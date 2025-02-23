
from rest_framework import serializers	
from .models import SalahRecord

class SalahRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalahRecord
        fields = ['id', 'prayer_name', 'status', 'date']  
