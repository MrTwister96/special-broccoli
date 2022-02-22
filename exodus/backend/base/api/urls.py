from django.urls import path, include
from base.api import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenRefreshView,)

router = DefaultRouter()
router.register(r'congregations', views.CongregationViewSet, basename='congregation')
router.register(r'sermons', views.SermonViewSet, basename='sermon')
router.register(r'preachers', views.PeacherViewSet, basename='preacher')
router.register(r'series', views.SeriesViewSet, basename='series')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', views.getRoutes),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]