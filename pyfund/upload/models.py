from django.db import models


class PublicFile(models.Model):

    seriesType = models.CharField(max_length=100)
    file = models.FileField(blank=False, null=False, upload_to="public")
    seriesName = models.CharField(max_length=100)
    note = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
