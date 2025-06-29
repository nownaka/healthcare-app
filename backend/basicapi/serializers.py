from rest_framework import serializers
from .models import CustomUser, UserProfile, WeightRecord, CalorieRecord, SleepRecord
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import logging

# ロガーを取得
logger = logging.getLogger('django')

# ユーザー登録用シリアライザ
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password')

    def create(self, validated_data):
        # create_user を使うとパスワードは自動でハッシュ化される
        user = CustomUser.objects.create_user(**validated_data)
        return user

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {"password": {"write_only": True}}

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        # 通常フィールドはここで更新
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # パスワードだけハッシュ
        if password:
            instance.set_password(password)   # make_password でも可

        instance.save()
        return instance
# JWT トークン用シリアライザ
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        logger.debug(f"CustomTokenObtainPairSerializer.get_token called for user: {user.email}")
        token = super().get_token(user)
        token['email'] = user.email  # カスタムクレーム
        token['user_id'] = user.id
        return token


# プロフィールシリアライザー
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

# 体重履歴シリアライザー
class WeightRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightRecord
        fields = '__all__'

# カロリー記録シリアライザー
class CalorieRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalorieRecord
        fields = '__all__'

# カロリー記録シリアライザー
class SleepRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepRecord
        fields = '__all__'
