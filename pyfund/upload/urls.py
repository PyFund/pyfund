from django.urls import path
from .api import PublicUploadAPI, PublicUploadAPIDetail


urlpatterns = [
    path("api/upload/public", PublicUploadAPI.as_view()),
    path("api/upload/public/<int:pk>/", PublicUploadAPIDetail.as_view()),
]
