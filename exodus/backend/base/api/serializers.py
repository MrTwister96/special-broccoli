from dataclasses import fields
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ModelSerializer, CharField, IntegerField
from base import models
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add Custom Claims
        token['username'] = user.username

        return token


class CategorySerializer(ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"

class SermonSerializer(ModelSerializer):
    preacher_label = CharField(source="preacher.label", required=False)
    audio_file_size = IntegerField(source="audio_file.size", required=False)

    class Meta:
        model = models.Sermon
        # fields = ["id", "preacher_label", "audio_file_size", "date", "theme", "scripture", "download_count", "congregation", "preacher", "series", "category"]
        fields = "__all__"

class PreacherSerializer(ModelSerializer):
    label = CharField(source="__str__")
    # sermons = SermonSerializer(many=True, read_only=True)
    class Meta:
        model = models.Preacher
        fields = "__all__"

class SeriesSerializer(ModelSerializer):
    label = CharField(source="getLabel")
    category_name = CharField(source="category")
    # sermons = SermonSerializer(many=True, read_only=True)
    class Meta:
        model = models.Series
        fields = "__all__"

class CongregationSerializer(ModelSerializer):
    label = CharField(source="name")
    # sermons = SermonSerializer(many=True, read_only=True)
    preachers = PreacherSerializer(many=True, read_only=True)
    series = SeriesSerializer(many=True, read_only=True)
    class Meta:
        model = models.Congregation
        fields = "__all__"