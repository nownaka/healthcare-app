FROM python:3


# ディレクトリ作成
RUN mkdir /code

# ディレクトリ変更
WORKDIR /code

# requirements.txt をコピー
COPY requirements.txt /code/

# パッケージインストール
RUN pip install -r requirements.txt

# プロジェクトファイルをコピー
COPY . /code/

# 実行権限を付与
RUN chmod +x /code/scripts/create_superuser.sh

# 公開ポート
EXPOSE 8000

# 起動コマンド
CMD ["sh", "-c", "python manage.py migrate && sh scripts/create_superuser.sh && python manage.py runserver 0.0.0.0:8000"]
