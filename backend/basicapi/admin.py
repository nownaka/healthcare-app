from django.contrib import admin
from .models import User  # models.py から User をインポート

# Register your models here.
admin.site.register(User)