from django.db import models
from appointments.models import Appointment

class Invoice(models.Model):
    STATUS = [('paid','Paid'),('pending','Pending'),('cancelled','Cancelled')]

    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE)
    invoice_number = models.CharField(max_length=20, unique=True)
    consultation_fee = models.DecimalField(max_digits=8, decimal_places=2)
    tax = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Invoice #{self.invoice_number}"