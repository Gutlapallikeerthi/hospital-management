from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLES = (
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('receptionist', 'Receptionist'),
        ('patient', 'Patient'),
    )
    role = models.CharField(max_length=20, choices=ROLES, default='admin')
    phone = models.CharField(max_length=15, blank=True)