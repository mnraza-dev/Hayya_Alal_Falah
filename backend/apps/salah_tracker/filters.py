import django_filters
from .models import SalahRecord

class SalahRecordFilter(django_filters.FilterSet):
    prayer_name = django_filters.CharFilter(field_name="prayer_name", lookup_expr="iexact")  
    date = django_filters.DateFilter(field_name="date")  
    status = django_filters.CharFilter(field_name="status", lookup_expr="iexact")  
    
    class Meta:
        model = SalahRecord
        fields = ["prayer_name", "date", "status"]
