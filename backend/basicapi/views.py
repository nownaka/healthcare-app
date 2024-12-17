from rest_framework.response import Response
from rest_framework import status, generics
from .models import User
from .serializers import UserSerializer
from django.utils import timezone  # 最後のログイン時間を更新するため

# ユーザー登録用のAPIエンドポイント
class CreateUserView(generics.CreateAPIView):
    """
    新規ユーザーを登録するためのAPIビュー
    """
    queryset = User.objects.all()  # ユーザーのデータを対象とする
    serializer_class = UserSerializer  # 使用するシリアライザを指定

# ユーザーログイン用のAPIエンドポイント
class LoginUserView(generics.CreateAPIView):
    """
    ユーザーログインを行うためのAPIビュー
    """
    def post(self, request, *args, **kwargs):
        # リクエストからユーザー名とパスワードを取得
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            # ユーザー名でデータベースからユーザーを取得
            user = User.objects.get(username=username)
            
            # パスワードが正しいか確認する
            if user.check_password(password):
                # パスワードが正しければ、最終ログイン時間を更新
                user.last_login = timezone.now()
                user.save()
                return Response({'message': 'ログイン成功'}, status=status.HTTP_200_OK)
            else:
                # パスワードが間違っている場合
                return Response({'error': 'パスワードが正しくありません'}, status=status.HTTP_401_UNAUTHORIZED)
        
        except User.DoesNotExist:
            # ユーザー名がデータベースに存在しない場合
            return Response({'error': 'ユーザーが存在しません'}, status=status.HTTP_401_UNAUTHORIZED)
