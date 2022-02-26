from dataclasses import fields
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ModelSerializer
from base import models
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add Custom Claims
        token['username'] = user.username

        return token

class SermonSerializer(ModelSerializer):
    class Meta:
        model = models.Sermon
        fields = "__all__"

class PreacherSerializer(ModelSerializer):
    sermons = SermonSerializer(many=True, read_only=True)
    class Meta:
        model = models.Preacher
        fields = "__all__"

class SeriesSerializer(ModelSerializer):
    sermons = SermonSerializer(many=True, read_only=True)
    class Meta:
        model = models.Series
        fields = "__all__"

class CongregationSerializer(ModelSerializer):
    sermons = SermonSerializer(many=True, read_only=True)
    preachers = PreacherSerializer(many=True, read_only=True)
    series = SeriesSerializer(many=True, read_only=True)
    class Meta:
        model = models.Congregation
        fields = "__all__"