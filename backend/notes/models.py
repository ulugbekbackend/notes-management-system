from django.db import models
from django.contrib.auth.models import User
from categories.models import Category
from tags.models import Tag


class Note(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notes"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="notes"
    )

    title = models.CharField(max_length=255)

    content = models.TextField()

    tags = models.ManyToManyField(
        Tag,
        blank=True
    )

    is_favorite = models.BooleanField(default=False)

    is_archived = models.BooleanField(default=False)

    # NEW FIELD
    is_deleted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "is_deleted"]),
            models.Index(fields=["user", "is_archived"]),
            models.Index(fields=["user", "is_favorite"]),
        ]

    def __str__(self):
        return self.title