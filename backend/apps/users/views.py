from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import generics, status
from django.contrib.auth import get_user_model
from .serializers import CustomTokenObtainPairSerializer, UserSerializer
from rest_framework.permissions import AllowAny

User = get_user_model()

# Login View (JWT Token)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# User Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user).data,
            "message": "User registered successfully!"
        }, status=status.HTTP_201_CREATED)
