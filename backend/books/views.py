from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from .models import Book
from .serializers import BookSerializer
from users.permissions import IsLibrarian

class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_permissions(self):
        # Everyone logged in can READ
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated()]

        # Only librarian can WRITE
        return [IsAuthenticated(), IsLibrarian()]
