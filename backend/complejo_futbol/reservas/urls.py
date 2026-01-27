from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReservaViewSet
from .views import ReservaViewSet, listar_reservas_admin
from .views import crear_admin

router = DefaultRouter()
router.register(r'reservas', ReservaViewSet, basename='reservas')

urlpatterns = [
    path('', include(router.urls)),
    
    # 🔐 SOLO ADMIN
    path('reservas/admin/', listar_reservas_admin),
    
    path("crear-admin/", crear_admin),
]
