from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    available_copies = models.IntegerField(default=1)

    def __str__(self):
        return self.title


class Borrow(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrowed_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(blank=True, null=True)
    returned = models.BooleanField(default=False)
    fine_amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        # Set due date only when first created
        if not self.pk:
            self.due_date = timezone.now() + timedelta(days=5)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"