from django.db import models

class Patient(models.Model):
    BLOOD_GROUPS = [('A+','A+'),('A-','A-'),('B+','B+'),('B-','B-'),
                    ('O+','O+'),('O-','O-'),('AB+','AB+'),('AB-','AB-')]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    blood_group = models.CharField(max_length=5, choices=BLOOD_GROUPS)
    address = models.TextField()
    medical_history = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"