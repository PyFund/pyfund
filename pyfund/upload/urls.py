from django.urls import path
from .api import PublicUploadAPI, PublicUploadAPIDetail


urlpatterns = [
    path("api/series/public", PublicUploadAPI.as_view()),
    path("api/series/public/<int:pk>/", PublicUploadAPIDetail.as_view()),
]
