from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # Accounts
    path("api/", include("accounts.urls")),
    path("api/", include("tags.urls")),
    # Notes
    path("api/", include("notes.urls")),

    # Categories
    path("api/", include("categories.urls")),
    # JWT
    path("api/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]