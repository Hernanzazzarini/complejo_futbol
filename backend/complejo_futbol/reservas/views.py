from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Reserva
from .serializers import ReservaSerializer
import random
from datetime import datetime, timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


def generar_codigo():
    return ''.join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", k=6))


class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all().order_by("-created_at")
    serializer_class = ReservaSerializer

    def perform_create(self, serializer):
        fecha = serializer.validated_data['fecha']
        hora_inicio = serializer.validated_data['hora_inicio']
        hora_fin = serializer.validated_data['hora_fin']

        margen = timedelta(minutes=10)

        inicio_nuevo = datetime.combine(fecha, hora_inicio)
        fin_nuevo = datetime.combine(fecha, hora_fin)

        # 🔴 SOLO CONSIDERAR RESERVAS CONFIRMADAS
        conflicto = Reserva.objects.filter(
            fecha=fecha,
            estado='confirmada',
            hora_inicio__lt=(fin_nuevo + margen).time(),
            hora_fin__gt=(inicio_nuevo - margen).time()
        ).exists()

        if conflicto:
            raise ValidationError({
                "non_field_errors": ["Ya existe una reserva en ese horario."]
            })

        serializer.save(
            codigo_cancelacion=generar_codigo(),
            estado='confirmada'
        )

    @action(detail=False, methods=['post'])
    def cancelar(self, request):
        codigo = request.data.get("codigo")

        if not codigo:
            return Response(
                {"error": "Se requiere el código de cancelación"},
                status=400
            )

        try:
            reserva = Reserva.objects.get(
                codigo_cancelacion=codigo,
                estado='confirmada'
            )
        except Reserva.DoesNotExist:
            return Response(
                {"error": "Código inválido o reserva ya cancelada"},
                status=400
            )

        reserva.estado = "cancelada"
        reserva.save()

        return Response({
            "mensaje": "Reserva cancelada correctamente. El horario quedó libre."
        })
        
# 🔐 VISTA SOLO PARA EL DUEÑO (ADMIN)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_reservas_admin(request):
    reservas = Reserva.objects.all().order_by('-created_at')
    serializer = ReservaSerializer(reservas, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_admin(request):
    """
    Crea un nuevo usuario admin.
    Solo accesible si el request viene de un usuario autenticado.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Faltan datos"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "El usuario ya existe"}, status=400)

    User.objects.create_superuser(username=username, password=password)
    return Response({"mensaje": "Usuario admin creado correctamente"})        
