from rest_framework import serializers
from .models import PublicFile

# User Serializer
class PostPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicFile
        fields = ["id"]


class GetPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicFile
        fields = ["id", "created_at", "series_type", "series_name", "note"]
