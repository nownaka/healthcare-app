import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import UserProfile, WeightRecord, CalorieRecord
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer, UserProfileSerializer, WeightRecordSerializer, CalorieRecordSerializer

# ログ設定
logger = logging.getLogger(__name__)

# ユーザー登録用ビュー
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(
                    {"message": "User registered successfully!"},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                logger.error(f"Error during user registration: {e}", exc_info=True)
                return Response(
                    {"error": "An unexpected error occurred during registration."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        # エラー内容をログに記録
        logger.warning(f"Validation failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# JWT トークン発行ビュー
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# プロフィールビューセット
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

# 体重履歴ビューセット
class WeightRecordViewSet(viewsets.ModelViewSet):
    queryset = WeightRecord.objects.all()
    serializer_class = WeightRecordSerializer

# カロリー記録ビューセット
class CalorieRecordViewSet(viewsets.ModelViewSet):
    queryset = CalorieRecord.objects.all()
    serializer_class = CalorieRecordSerializer