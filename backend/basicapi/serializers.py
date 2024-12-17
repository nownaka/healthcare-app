from rest_framework import serializers
from .models import User

# ユーザーモデルをシリアライズするクラス（データをJSON形式に変換）
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # 対象のモデルはUserクラス
        fields = ('username', 'password')  # シリアライズするフィールドを指定
        extra_kwargs = {'password': {'write_only': True}}  # パスワードは書き込み専用（レスポンスには含めない）

    # ユーザーを作成する際にパスワードをハッシュ化して保存するメソッド
    def create(self, validated_data):
        """
        新しいユーザーを作成する際にパスワードをハッシュ化する。
        """
        # ユーザー名を設定し、パスワードをハッシュ化して保存
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])  # パスワードをハッシュ化
        user.save()  # ユーザーをデータベースに保存
        return user  # 作成されたユーザーを返す
