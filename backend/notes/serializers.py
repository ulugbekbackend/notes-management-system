from rest_framework import serializers

from .models import Note
from categories.models import Category



class NoteSerializer(serializers.ModelSerializer):

    # For displaying category name
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )


    class Meta:

        model = Note

        fields = [
            "id",
            "user",
            "title",
            "content",
            "category",
            "category_name",
            "tags",
            "is_favorite",
            "is_archived",
            # Was missing before -- without this field, PATCH requests from
            # the "move to trash" / "restore" actions were silently ignored
            # by DRF (unknown fields in input data are dropped), so trash
            # never actually worked.
            "is_deleted",
            "created_at",
            "updated_at",
        ]


        read_only_fields = [
            "user",
            "created_at",
            "updated_at",
            "category_name",
        ]

    def _current_user(self):
        request = self.context.get("request")
        return request.user if request else None

    def validate_category(self, category):
        """Prevent assigning a category that belongs to another user."""
        if category is not None:
            user = self._current_user()
            if user and category.user_id != user.id:
                raise serializers.ValidationError(
                    "You can only use your own categories."
                )
        return category

    def validate_tags(self, tags):
        """Prevent attaching tags that belong to another user."""
        user = self._current_user()
        if user:
            for tag in tags:
                if tag.user_id != user.id:
                    raise serializers.ValidationError(
                        "You can only use your own tags."
                    )
        return tags