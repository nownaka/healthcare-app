# Create your models here.
from django.db import models

# アプリに接続する用のユーザーテーブル
class User(models.Model):
    username = models.CharField(max_length=150, unique=True)  # ユーザー名　一意の値になるようunique=True
    password = models.CharField(max_length=128)  # パスワード (ハッシュ化を推奨)

    def __str__(self):
        return self.username
