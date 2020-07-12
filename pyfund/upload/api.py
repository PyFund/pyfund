from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.http import Http404

from .models import PublicFile
from .serializers import (
    PostPublicSerializer,
    GetPublicSerializer,
)

# Register API
class PublicUploadAPI(APIView):

    parser_class = (MultiPartParser,)
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):

        serializer = PostPublicSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):

        files = PublicFile.objects.all()
        serializer = GetPublicSerializer(files, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class PublicUploadAPIDetail(APIView):

    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        try:
            return PublicFile.objects.get(pk=pk)
        except PublicFile.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):

        file = self.get_object(pk)
        serializer = PostPublicSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):

        file = self.get_object(pk=pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
