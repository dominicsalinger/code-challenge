from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Product(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False, default='')
    description = models.CharField(max_length=300, blank=True, default='')
    price = models.FloatField()
    quantity = models.IntegerField()

class Cart(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
