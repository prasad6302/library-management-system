from rest_framework import viewsets, permissions
from django.utils import timezone
from .models import Book, Borrow
from .serializers import BookSerializer, BorrowSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]


class BorrowViewSet(viewsets.ModelViewSet):
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Borrow.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()

    def update(self, request, *args, **kwargs):
        borrow = self.get_object()

        if not borrow.returned:
            borrow.returned = True

            if borrow.due_date and timezone.now() > borrow.due_date:
                days_late = (timezone.now() - borrow.due_date).days
                borrow.fine_amount = days_late * 10

            borrow.book.available_copies += 1
            borrow.book.save()
            borrow.save()

        serializer = self.get_serializer(borrow)
        return super().update(request, *args, **kwargs)