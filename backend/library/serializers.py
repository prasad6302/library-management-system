from rest_framework import serializers
from django.utils import timezone
from datetime import timedelta
from .models import Book, Borrow


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class BorrowSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source="user.username", read_only=True)
    book_title = serializers.CharField(source="book.title", read_only=True)

    class Meta:
        model = Borrow
        fields = [
            "id",
            "user",
            "user_username",
            "book",
            "book_title",
            "borrowed_at",
            "due_date",
            "returned",
            "fine_amount",
        ]
        read_only_fields = [
            "user",
            "borrowed_at",
            "due_date",
            "fine_amount",
        ]

    def create(self, validated_data):
        request = self.context["request"]
        user = request.user
        book = validated_data["book"]

        if book.available_copies <= 0:
            raise serializers.ValidationError("No copies available")

        book.available_copies -= 1
        book.save()

        due_date = timezone.now() + timedelta(days=5)

        return Borrow.objects.create(
            user=user,
            book=book,
            due_date=due_date,
            fine_amount=0,
        )