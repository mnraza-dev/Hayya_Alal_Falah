from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now
from .models import Challenges, UserChallenge
from .serializers import ChallengeSerializer, UserChallengeSerializer

class ChallengeViewSet(viewsets.ModelViewSet):
    queryset = Challenges.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        """Override list method to show joined status."""
        challenges = Challenges.objects.all()
        user_challenges = UserChallenge.objects.filter(user=request.user)
        joined_ids = [uc.challenge.id for uc in user_challenges]

        response_data = []
        for challenge in challenges:
            challenge_data = ChallengeSerializer(challenge).data
            challenge_data["joined"] = challenge.id in joined_ids
            response_data.append(challenge_data)

        return Response(response_data)
    
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        """User joins a challenge."""
        challenge = self.get_object()
        
        # Check if user is already in the challenge
        user_challenge, created = UserChallenge.objects.get_or_create(
            user=request.user, challenge=challenge
        )
        
        if created:
            return Response({"message": "Challenge joined successfully!"}, status=201)
        
        return Response({"message": "Already joined this challenge."}, status=400)


    # @action(detail=True, methods=['post'])
    # def join(self, request, pk=None):
    #     """User joins a challenge."""
    #     challenge = self.get_object()
    #     user_challenge, created = UserChallenge.objects.get_or_create(
    #         user=request.user, challenge=challenge
    #     )
    #     if created:
    #         return Response({"message": "Challenge joined successfully!"}, status=201)
    #     return Response({"message": "Already joined this challenge."}, status=400)

    @action(detail=True, methods=['post'])
    def update_progress(self, request, pk=None):
        """User updates progress for a challenge."""
        challenge = self.get_object()
        user_challenge = UserChallenge.objects.filter(user=request.user, challenge=challenge).first()

        if not user_challenge:
            return Response({"message": "You have not joined this challenge."}, status=400)

        if user_challenge.completed:
            return Response({"message": "Challenge already completed."}, status=400)

        user_challenge.progress += 1
        user_challenge.update_progress()
        user_challenge.save()

        return Response({"message": f"Progress updated: {user_challenge.progress}/{challenge.duration_days}"})
