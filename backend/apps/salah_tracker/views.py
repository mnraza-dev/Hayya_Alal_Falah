from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
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

    @action(detail=False, methods=["put"])
    def update_status(self, request):
        prayer_name = request.data.get("prayer_name")
        date = request.data.get("date")
        prayer_status = request.data.get("status")  # Avoid conflict with `status` module

        # Validate inputs
        if not prayer_name or not date or not prayer_status:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        if prayer_status not in ["completed", "missing"]:
            return Response({"error": "Invalid status value"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            record = SalahRecord.objects.get(user=request.user, prayer_name=prayer_name, date=date)
            record.status = prayer_status
            record.save()
            return Response(SalahRecordSerializer(record).data, status=status.HTTP_200_OK)

        except SalahRecord.DoesNotExist:
            new_record = SalahRecord.objects.create(
                user=request.user,
                prayer_name=prayer_name,
                date=date,
                status=prayer_status,
            )
            return Response(SalahRecordSerializer(new_record).data, status=status.HTTP_201_CREATED)
