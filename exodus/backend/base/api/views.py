from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from base import models
from base.api import serializers
from rest_framework import viewsets
import os
from .validations import sermons_query_schema, series_query_schema
from filters.mixins import (
    FiltersMixin,
)
from .serializers import SermonSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/token/refresh/',
    ]

    return Response(routes)


class CongregationViewSet(FiltersMixin, viewsets.ModelViewSet):
    serializer_class = serializers.CongregationSerializer
    queryset = models.Congregation.objects.all()

    filter_mappings = {
        "slug": "slug"
    }

    def get_permissions(self):
        edit_actions = ["create", "update", "partial_update", "destroy"]
        if self.action in edit_actions:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]
    
    @action(detail=True)
    def image_file(self, request, pk=None):
        congregation = models.Congregation.objects.get(pk=pk)
        image_file = congregation.image_file
        extention = image_file.name.split(".")[-1]

        with open(image_file.path, "rb") as fh:
            response = HttpResponse(fh.read(), content_type="image/jpg")
            response['Content-Disposition'] = f'filename={congregation.slug}.{extention}'
            response['Accept-Ranges'] = 'bytes'
            response['X-Sendfile'] = image_file.path
            response['Content-Length'] = os.path.getsize(image_file.path)

        return response

class SermonViewSet(FiltersMixin, viewsets.ModelViewSet):
    serializer_class = serializers.SermonSerializer
    queryset = models.Sermon.objects.all()

    filter_mappings = {
        'id': 'id',
        'congregation': 'congregation',
    }

    filter_validation_schema = sermons_query_schema

    # def create(self, request):
    #     test = serializers.SermonSerializer(data=request.data)
    #     print(test.is_valid())
    #     print(test.errors)
    #     print(request.data)


    def get_permissions(self):
        edit_actions = ["create", "update", "partial_update", "destroy"]
        if self.action in edit_actions:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    @action(detail=True)
    def get_audio(self, request, pk=None):
        sermon = models.Sermon.objects.get(pk=pk)
        sermon.download_count += 1
        sermon.save()
        audio = sermon.audio_file

        with open(audio.path, "rb") as fh:
            response = HttpResponse(fh.read(), content_type="audio/mpeg")
            response['Content-Disposition'] = f'attachment;  filename={sermon.theme}.mp3'
            response['Accept-Ranges'] = 'bytes'
            response['X-Sendfile'] = audio.path
            response['Content-Length'] = os.path.getsize(audio.path)

        return response



class PeacherViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PreacherSerializer
    queryset = models.Preacher.objects.all()

    def get_permissions(self):
        edit_actions = ["create", "update", "partial_update", "destroy"]
        if self.action in edit_actions:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

class SeriesViewSet(FiltersMixin, viewsets.ModelViewSet):
    serializer_class = serializers.SeriesSerializer
    queryset = models.Series.objects.all()

    filter_mappings = {
        'id': 'id',
        'congregation': 'congregation',
    }

    filter_validation_schema = series_query_schema

    def get_permissions(self):
        edit_actions = ["create", "update", "partial_update", "destroy"]
        if self.action in edit_actions:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]
    
    @action(detail=True)
    def sermons(self, request, pk=None):
        series = models.Series.objects.get(pk=pk)
        sermons = series.sermons.all().order_by("date")
        serializer = SermonSerializer(sermons, many=True)
        return Response(serializer.data)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()

    def get_permissions(self):
        edit_actions = ["create", "update", "partial_update", "destroy"]
        if self.action in edit_actions:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]