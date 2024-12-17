from django.db import models

# Create your models here.
# アプリに接続する用のユーザーテーブル
class User(models.Model):
    username = models.CharField(max_length=150, unique=True)  # ユーザー名　一意の値になるようunique=True
    password = models.CharField(max_length=128)  # パスワード (ハッシュ化を推奨)
    date_joined = models.DateTimeField(auto_now_add=True)  # 登録した日
    last_login = models.DateTimeField(null=True, blank=True) # 必須: Django の認証システムが利用する last_login フィールド
    def __str__(self):
        return self.username