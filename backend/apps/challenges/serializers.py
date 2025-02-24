from rest_framework import serializers
from .models import Challenges, UserChallenge

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenges
        fields = '__all__'

class UserChallengeSerializer(serializers.ModelSerializer):
    challenge_title = serializers.ReadOnlyField(source='challenge.title')

    class Meta:
        model = UserChallenge
        fields = ['id', 'challenge_title', 'progress', 'completed']
