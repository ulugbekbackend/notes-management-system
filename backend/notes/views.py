from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):

    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "title",
        "content",
    ]

    ordering_fields = [
        "created_at",
        "updated_at",
        "title",
    ]

    ordering = [
        "-created_at"
    ]

    def get_queryset(self):
        return (
            Note.objects.filter(user=self.request.user)
            .select_related("category")
            .prefetch_related("tags")
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)