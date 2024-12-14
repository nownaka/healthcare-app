# superuser の情報
SUPERUSER_NAME=${DJANGO_SUPERUSER_USERNAME}
SUPERUSER_EMAIL=${DJANGO_SUPERUSER_EMAIL}
SUPERUSER_PASSWORD=${DJANGO_SUPERUSER_PASSWORD}

# superuser が存在しない場合のみ作成
# superuser の情報
echo "Checking for existing superuser..."
python manage.py shell -c "
import os
from django.contrib.auth.models import User

superuser_name = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
superuser_email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
superuser_password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')

if not superuser_name or not superuser_email or not superuser_password:
    print('Error: Missing environment variables for superuser creation.')
else:
    if not User.objects.filter(username=superuser_name).exists():
        User.objects.create_superuser(superuser_name, superuser_email, superuser_password)
        print('Superuser created.')
    else:
        print('Superuser already exists.')
"