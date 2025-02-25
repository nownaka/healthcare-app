from django.urls import path, include
from .views import RegisterView, TokenObtainPairView,UserProfileViewSet, WeightRecordViewSet, CalorieRecordViewSet, SleepRecordViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView

router = DefaultRouter()
router.register(r'user-profiles', UserProfileViewSet, basename='userprofile')
router.register(r'weight-records', WeightRecordViewSet, basename='weightrecord')
router.register(r'calorie-records', CalorieRecordViewSet, basename='calorierecord')
router.register(r'sleep-records', SleepRecordViewSet, basename='sleeprecord')

urlpatterns = [
    # ユーザー登録
    path('register/', RegisterView.as_view(), name='register'),
    # JWT トークン取得
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # CustomTokenObtainPairView.as_view(),
    # JWT トークンリフレッシュ
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('', include(router.urls)),

]
