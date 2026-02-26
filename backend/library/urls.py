from rest_framework.routers import DefaultRouter
from .views import BookViewSet, BorrowViewSet

router = DefaultRouter()
router.register("books", BookViewSet)
router.register("borrows", BorrowViewSet)

urlpatterns = router.urls