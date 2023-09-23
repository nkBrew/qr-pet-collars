from django.db import models


class Collar(models.Model):
    pet_name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    weight = models.DecimalField(null=True, default=None, max_digits=8, decimal_places=2)
    owner_name = models.CharField(max_length=100)
    owner_email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    qr_code_id = models.IntegerField()
