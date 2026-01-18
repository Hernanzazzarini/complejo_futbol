from rest_framework import serializers
from .models import Reserva

class ReservaSerializer(serializers.ModelSerializer):
    codigo_cancelacion = serializers.CharField(read_only=True)  # <-- IMPORTANTE
    estado = serializers.CharField(read_only=True)  # opcional

    class Meta:
        model = Reserva
        fields = '__all__'
