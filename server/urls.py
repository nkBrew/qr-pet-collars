from django.contrib import admin
from django.urls import path
from rest_framework import routers

from api import views

router = routers.SimpleRouter()
router.register(r'collar', views.CollarView, basename='collar')

urlpatterns = [
    path('admin/', admin.site.urls),
    # auth
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),

    path('makeqr/<int:id>/', views.make_qr_code, name='make-qr'),
]

urlpatterns += router.urls
