from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# 独自のユーザーモデル（新しいユーザー管理用のテーブル）
class User(models.Model):
    # ユーザー名を格納するフィールド（重複不可）
    username = models.CharField(max_length=150, unique=True)  # unique=Trueで一意の値になる
    # パスワードを格納するフィールド（ハッシュ化して保存）
    password = models.CharField(max_length=128)  # 最大128文字のパスワードフィールド
    # ユーザー登録日時を記録するフィールド（自動的に現在時刻をセット）
    date_joined = models.DateTimeField(auto_now_add=True)  # 新規作成時のみ自動的に日付を保存
    # 最後にログインした日時を記録するフィールド（nullと空白を許可）
    last_login = models.DateTimeField(null=True, blank=True)
    # アカウントがアクティブか判定
    is_active = models.BooleanField(default=True)

    # パスワードをハッシュ化して保存するメソッド
    def set_password(self, raw_password):
        self.password = make_password(raw_password)  # 入力されたパスワードをハッシュ化
    # 入力されたパスワードが保存されているハッシュ化パスワードと一致するかを確認するメソッド
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)  # パスワードが正しいかをチェック

    # オブジェクトを文字列として表示する際に使われるメソッド
    def __str__(self):
        return self.username  # ユーザー名を表示する
