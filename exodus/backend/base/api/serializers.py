from dataclasses import fields
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from base import models
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add Custom Claims
        token['username'] = user.username

        return token

class SermonSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = models.Sermon
        fields = "__all__"

class PreacherSerializer(HyperlinkedModelSerializer):
    sermons = SermonSerializer(many=True, read_only=True)
    class Meta:
        model = models.Preacher
        fields = "__all__"

class SeriesSerializer(HyperlinkedModelSerializer):
    sermons = SermonSerializer(many=True, read_only=True)
    class Meta:
        model = models.Series
        fields = "__all__"

class CongregationSerializer(HyperlinkedModelSerializer):
    sermons = SermonSerializer(many=True, read_only=True)
    preachers = PreacherSerializer(many=True, read_only=True)
    series = SeriesSerializer(many=True, read_only=True)
    class Meta:
        model = models.Congregation
        fields = "__all__"