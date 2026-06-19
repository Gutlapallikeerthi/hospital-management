from django.db import models

class Doctor(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    specialization = models.CharField(max_length=100)
    experience_years = models.IntegerField()
    available_days = models.CharField(max_length=200)
    consultation_fee = models.DecimalField(max_digits=8, decimal_places=2)
    profile_image = models.ImageField(upload_to='doctors/', blank=True)

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name}"