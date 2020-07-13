from django.urls import path
from .api import PublicUploadAPI, PublicUploadDetailAPI


urlpatterns = [
    path("api/series/public", PublicUploadAPI.as_view()),
    path("api/series/public/<int:pk>/", PublicUploadDetailAPI.as_view()),
]
