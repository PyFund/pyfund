from django.urls import path
from .api import PublicUploadAPI


urlpatterns = [path("api/upload/public", PublicUploadAPI.as_view())]
