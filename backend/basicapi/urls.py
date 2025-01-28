from django.urls import path, include
from .views import RegisterView, CustomTokenObtainPairView,UserProfileViewSet, WeightRecordViewSet, CalorieRecordViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'user-profiles', UserProfileViewSet, basename='userprofile')
router.register(r'weight-records', WeightRecordViewSet, basename='weightrecord')
router.register(r'calorie-records', CalorieRecordViewSet, basename='calorierecord')

urlpatterns = [
    # ユーザー登録
    path('register/', RegisterView.as_view(), name='register'),
    # JWT トークン取得
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # JWT トークンリフレッシュ
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('', include(router.urls)),

]
