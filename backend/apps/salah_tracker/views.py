from rest_framework import viewsets, permissions
from .models import SalahRecord
from .serializers import SalahRecordSerializer
class SalahRecordViewSet(viewsets.ModelViewSet):
    queryset = SalahRecord.objects.all()
    serializer_class = SalahRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SalahRecord.objects.filter(user=self.request.user)  # ✅ Only return user's data

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # ✅ Auto-assign logged-in user
