from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import SalahRecord
from .serializers import SalahRecordSerializer
from .filters import SalahRecordFilter
class SalahRecordViewSet(viewsets.ModelViewSet):
    queryset = SalahRecord.objects.all()
    serializer_class = SalahRecordSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = SalahRecordFilter
    ordering_fields = ["date"]  

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)  

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  
