from rest_framework import serializers
from .models import Invoice
from appointments.serializers import AppointmentSerializer

class InvoiceSerializer(serializers.ModelSerializer):
    appointment_detail = AppointmentSerializer(source='appointment', read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'