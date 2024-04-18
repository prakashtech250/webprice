from django.db import models

# Create your models here.
class Products(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    asin = models.CharField(max_length=20, blank=False, default='')
    title = models.CharField(max_length=100, blank=True, default='')
    country = models.CharField(max_length=5, blank=True)
    domain = models.CharField(max_length=20, blank=True)
    productUrl = models.CharField(max_length=100, blank=True)
    price = models.FloatField(blank=True)
    reviews = models.IntegerField(blank=True)
    ratings = models.FloatField(blank=True)
    
    class Meta:
        ordering = ['created']
