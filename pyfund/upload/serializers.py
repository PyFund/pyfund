from rest_framework import serializers
from .models import PublicFile

# User Serializer
class PostPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicFile
        fields = ["id", "file", "created_at", "seriesName", "seriesType", "note"]


class GetPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicFile
        fields = ["id", "created_at", "seriesName", "seriesType", "note"]
