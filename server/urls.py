from django.contrib import admin
from django.urls import path

from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # auth
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),

    path('makeqr/<int:id>/', views.make_qr_code, name='make-qr'),
    path('collar/<int:qr_code_id>/', views.CollarView.as_view(), name='collar-view-detail'),
    path('collar/', views.CollarView.as_view(), name='collar-view')
]
