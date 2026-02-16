from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.utils.timezone import now

from .models import Transaction
from .serializers import TransactionSerializer

class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()  # ✅ REQUIRED
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        book = serializer.validated_data["book"]

        if book.available_copies <= 0:
            raise ValidationError({"detail": "Book not available"})

        book.available_copies -= 1
        book.save()

        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def return_book(self, request, pk=None):
        transaction = self.get_object()

        if transaction.is_returned:
            return Response({"detail": "Already returned"})

        transaction.is_returned = True
        transaction.returned_at = now()
        transaction.save()

        book = transaction.book
        book.available_copies += 1
        book.save()

        return Response({"detail": "Book returned successfully"})
