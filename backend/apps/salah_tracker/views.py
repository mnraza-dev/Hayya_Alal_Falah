from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import SalahRecord
from .serializers import SalahRecordSerializer
from .filters import SalahRecordFilter
from rest_framework.decorators import action

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
        status = request.data.get("status")
        
        # Ensure the status is valid
        if status not in ["completed", "missing"]:
            return Response({"error": "Invalid status value"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Find the existing record or create a new one if it doesn't exist
        try:
            # Try to get the existing record for the user, prayer, and date
            record = SalahRecord.objects.get(user=request.user, prayer_name=prayer_name, date=date)
            
            # Update the status of the existing record
            record.status = status
            record.save()

            return Response(SalahRecordSerializer(record).data, status=status.HTTP_200_OK)

        except SalahRecord.DoesNotExist:
            # If no record is found, create a new one
            new_record = SalahRecord.objects.create(
                user=request.user,
                prayer_name=prayer_name,
                date=date,
                status=status,
            )

            return Response(SalahRecordSerializer(new_record).data, status=status.HTTP_201_CREATED)