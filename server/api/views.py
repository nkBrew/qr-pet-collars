import base64
import io
import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
import qrcode

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import Collar
from .serializers.collar_serializer import CollarSerializer


def make_qr_code(request, id):
    buffer = io.BytesIO()
    img = qrcode.make(f"http://localhost:3000/{id}")
    img.save(buffer)
    code = base64.b64encode(buffer.getvalue()).decode()

    return HttpResponse(f"<img src='data:image/png;base64, {code}'/>")


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    return JsonResponse({'isAuthenticated': request.user.is_authenticated})


def whoami_view(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username})
    return JsonResponse({'isAuthenticated': False})


class CollarView(ViewSet):
    lookup_url_kwarg = 'qr_code_id'

    def list(self, request):
        queryset = Collar.objects.all()
        serializer = CollarSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = CollarSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, qr_code_id):
        instance = get_object_or_404(Collar, qr_code_id=qr_code_id)
        serializer = CollarSerializer(instance=instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, qr_code_id):
        instance = get_object_or_404(Collar, qr_code_id=qr_code_id)
        serializer = CollarSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, qr_code_id):
        instance = get_object_or_404(Collar, qr_code_id=qr_code_id)
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
