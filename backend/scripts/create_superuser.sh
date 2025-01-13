# superuser の情報
SUPERUSER_NAME=${DJANGO_SUPERUSER_USERNAME}
SUPERUSER_EMAIL=${DJANGO_SUPERUSER_EMAIL}
SUPERUSER_PASSWORD=${DJANGO_SUPERUSER_PASSWORD}

# superuser が存在しない場合のみ作成
echo "Checking for existing superuser..."
python manage.py shell -c "
from django.contrib.auth.models import User;
if not User.objects.filter(username='${SUPERUSER_NAME}').exists():
    User.objects.create_superuser('${SUPERUSER_NAME}', '${SUPERUSER_EMAIL}', '${SUPERUSER_PASSWORD}');
    print('Superuser created.');
else:
    print('Superuser already exists.');
"