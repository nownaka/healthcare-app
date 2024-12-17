from django.urls import path
from .views import CreateUserView, LoginUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path(r'token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(r'token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]