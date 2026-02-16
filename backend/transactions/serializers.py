from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source="book.title", read_only=True)

    class Meta:
        model = Transaction
        fields = [
            "id",
            "book",          # writable (frontend sends this)
            "book_title",    # read-only (UI display)
            "issued_at",
            "returned_at",
            "is_returned",
        ]
        read_only_fields = [
            "issued_at",
            "returned_at",
            "is_returned",
        ]
