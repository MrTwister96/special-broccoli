from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from base import models
from base.api import serializers
from rest_framework import viewsets

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/token/refresh/',
    ]

    return Response(routes)

@api_view(['GET'])
def getCongregations(request):
    congregations = models.Congregation.objects.all()
    serializer = CongregationSerializer(congregations, many=True)
    return Response(serializer.data)


class CongregationViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CongregationSerializer
    queryset = models.Congregation.objects.all()

    def get_permissions(self):
        edit_actions = ["create", "update", "partial_update", "destroy"]
        if self.action in edit_actions:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class SermonViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SermonSerializer
    queryset = models.Sermon.objects.all()

    def get_permissions(self):
        edit_actions = ["create", "update", "partial_update", "destroy"]
        if self.action in edit_actions:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

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

class SeriesViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SeriesSerializer
    queryset = models.Series.objects.all()

    def get_permissions(self):
        edit_actions = ["create", "update", "partial_update", "destroy"]
        if self.action in edit_actions:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]