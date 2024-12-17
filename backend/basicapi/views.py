from django.shortcuts import render

# REST framework の便利なクラスを使用するためのモジュール
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer
import logging

# ユーザー登録を行うエンドポイントのクラスビュー
class CreateUserView(generics.CreateAPIView):
    # 使用するシリアライザーを指定
    serializer_class = UserSerializer
    # このエンドポイントは認証不要でアクセス可能
    permission_classes = [AllowAny]

    # POSTリクエストを処理する
    def post(self, request, *args, **kwargs):
        # リクエストデータをコンソールに出力（デバッグ用）
        print(request.data)

        # シリアライザーを初期化して、リクエストデータを渡す
        serializer = self.get_serializer(data=request.data)
        print(serializer)  # シリアライザーインスタンスをデバッグ表示

        try:
            # バリデーションを実行し、エラーがあれば例外を発生させる
            serializer.is_valid(raise_exception=True)

            # ユーザーをデータベースに保存し、インスタンスを取得
            user = self.perform_create(serializer)

            # 新規ユーザーをログインさせる（セッション管理）
            login(request, user)

            # 成功レスポンスを返す。登録されたユーザー情報を返却
            return Response({'user': UserSerializer(user, context=self.get_serializer_context()).data})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # シリアライザーを使用してユーザーを作成するメソッド
    def perform_create(self, serializer):
        # save() を呼び出してデータを保存し、インスタンスを返す
        return serializer.save()
    
logger = logging.getLogger(__name__)
# ユーザーログインを行うエンドポイントのクラスビュー
class LoginUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            # リクエストデータをログに出力
            logger.debug(f"Received data: {request.data}")

            username = request.data.get('username')
            password = request.data.get('password')
            print(username)
            print(password)

            # ユーザー認証を試みる
            user = authenticate(request, username=username, password=password)

            if user:
                # 認証成功時
                login(request, user)
                logger.debug(f"Login successful for user: {username}")
                return Response({'message': 'ログインに成功しました。'}, status=status.HTTP_200_OK)

            # 認証失敗時
            logger.warning(f"Login failed for user: {username}")
            return Response({'error': 'ログインに失敗しました。ユーザー名またはパスワードが正しくありません。'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            logger.error(f"An error occurred: {str(e)}", exc_info=True)
            return Response({'error': f'サーバー内部エラーが発生しました: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
