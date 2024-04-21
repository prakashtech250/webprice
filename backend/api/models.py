from django.db import models

# Create your models here.
class AmazonReviews(models.Model):
    asin = models.CharField(max_length=10)
    title = models.CharField(max_length=100)
    description = models.TextField()
    rating = models.IntegerField()
    author = models.CharField(max_length=10)
    reviewed_date = models.DateField()
    published_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title